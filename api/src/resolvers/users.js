import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { withFilter } from 'graphql-subscriptions'
import { GraphQLUpload } from 'graphql-upload'
import { Follow, Post, User } from '../models'
import { signUp, signIn } from '../validator'
import * as Auth from '../auth'
import pubSub from '../utils/Pubsub'
import { IS_USER_ONLINE } from '../constants/Subscriptions'
import { uploadToCloudinary } from '../utils/cloudinary'
const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    me: async (root, args, { req }, info) => {
      const { userId } = req.session
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError(`${userId} is not a valid user ID`)
      }

      const user = await User.findOneAndUpdate({ _id: userId }, { isOnline: true })
        .populate({ path: 'posts', options: { sort: { createdAt: 'desc' } } })
        .populate('likes')
        .populate('followers')
        .populate({
          path: 'following',
          populate: [
            { path: 'author' },
            { path: 'follower' }
          ]
        })
        .populate({
          path: 'notifications',
          populate: [
            { path: 'author' },
            { path: 'follow' },
            { path: 'like', populate: { path: 'post' } },
            { path: 'comment', populate: { path: 'post' } }
          ],
          match: { seen: false }
        })

      user.newNotifications = user.notifications
      return user
    },
    getUser: async (root, { id: _id }, context, info) => {
      if (!_id) {
        throw new UserInputError('id is required params.')
      }
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new UserInputError(`${_id} is not a valid user ID`)
      }
      const user = await User.findById(_id)
        .populate({
          path: 'posts',
          populate: [
            {
              path: 'author',
              populate: [
                { path: 'followers' },
                { path: 'following' },
                {
                  path: 'notifications',
                  populate: [{ path: 'author' }, { path: 'follow' }, { path: 'like' }, { path: 'comment' }]
                }
              ]
            },
            { path: 'comments', populate: { path: 'author' } },
            {
              path: 'likes',
              populate: [
                { path: 'user' },
                { path: 'post' }
              ]
            }
          ],
          options: { sort: { createdAt: 'desc' } }
        })
        .populate({
          path: 'following',
          populate: [
            { path: 'author' }
          ]
        })
        .populate({
          path: 'followers',
          populate: [
            { path: 'follower' },
            { path: 'author' }
          ]
        })
        .populate({
          path: 'notifications',
          populate: [{ path: 'author' }, { path: 'follow' }, { path: 'like' }, { path: 'comment' }]
        })
      if (!user) {
        throw new Error("User with given params doesn't exists.")
      }
      return user
    },
    getUsers: async (root, args, context, info) => {
      return await User.find({}).sort({ createdAt: 'desc' })
        .populate({
          path: 'following',
          populate: [
            { path: 'author' }
          ]
        })
        .populate({
          path: 'followers',
          populate: [
            { path: 'follower' },
            { path: 'author' }
          ]
        })
    },
    searchUsers: async (root, { searchQuery }, { req }, info) => {
      const { userId } = req.session
      if (!searchQuery) {
        return []
      }
      const query = {
        fullName: new RegExp(searchQuery, 'i'),
        // $or: [{ username: new RegExp(searchQuery, 'i') }, { fullName: new RegExp(searchQuery, 'i') }],
        _id: {
          $ne: userId
        }
      }
      const users = User.find(query).limit(50)
      return users
    },
    searchs: async (root, { searchQuery }, { req }, info) => {
      const { userId } = req.session
      if (!searchQuery) {
        return []
      }
      const query = {
        fullName: new RegExp(searchQuery, 'i'),
        _id: { $ne: userId }
      }
      const users = await User.find(query).populate('posts').limit(50)
      const posts = await Post.find({ title: new RegExp(searchQuery, 'i') }).populate('author').limit(50)
      const result = [...users, ...posts]
      return result.sort((a, b) => a.createdAt - b.createdAt)
    },
    suggestPeople: async (root, args, { req }, info) => {
      const { userId } = req.session

      const LIMIT = 6
      const userFollowing = []
      const following = await Follow.find({ follower: userId }, { _id: 0 }).select('author')
      following.map(f => userFollowing.push(f.author))
      userFollowing.push(userId)

      // Find random users
      const query = { _id: { $nin: userFollowing } }
      const usersCount = await User.where(query).countDocuments()
      let random = Math.floor(Math.random() * usersCount)

      const usersLeft = usersCount - random
      if (usersLeft < LIMIT) {
        random = random - (LIMIT - usersLeft)
        if (random < 0) {
          random = 0
        }
      }

      const randomUsers = await User.find(query)
        .populate({
          path: 'following',
          populate: { path: 'author' }
        })
        .populate({
          path: 'followers',
          populate: { path: 'follower' }
        })
        .skip(random).limit(LIMIT)
      return randomUsers
    }
  },
  Mutation: {
    signUp: async (root,
      { input: { fullName, email, password, confirmPassword } }
      , { req }, info) => {
      const { userId } = req.session
      if (userId) return await User.findById(userId)
      await signUp.validateAsync({ fullName, email, password, confirmPassword }, { abortEarly: false })

      const user = await User.create({ fullName, email, password })
      req.session.userId = user.id
      return user
    },
    signIn: async (root, args, { req }, info) => {
      const { userId } = req.session
      if (userId) return await User.findById(userId)

      await signIn.validateAsync(args, { abortEarly: false })

      const user = await Auth.attemptSignIn(args.email, args.password)
      req.session.userId = user.id
      return user
    },
    signOut: (root, args, { req, res }, info) => {
      Auth.signOut(req, res)
    },
    uploadUserPhoto: async (root, { input: { id, image, imagePublicId, isCover } }, { req }, info) => {
      const { createReadStream } = await image
      const stream = createReadStream()
      const uploadImage = await uploadToCloudinary(stream, 'user', imagePublicId)
      if (uploadImage.secure_url) {
        const fieldsToUpdate = {}
        if (isCover) {
          fieldsToUpdate.coverImage = uploadImage.secure_url
          fieldsToUpdate.coverImagePublicId = uploadImage.public_id
        } else {
          fieldsToUpdate.image = uploadImage.secure_url
          fieldsToUpdate.imagePublicId = uploadImage.public_id
        }
        const updatedUser = await User.findOneAndUpdate({ _id: id }, { ...fieldsToUpdate }, { new: true })
        // .populate('posts')
        // .populate('likes')

        return updatedUser
      }
      throw new Error('Something went wrong while uploading image to Cloudinary.')
    }
  },
  Subscription: {
    isUserOnline: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(IS_USER_ONLINE),
        (payload, variables, { userId }) => variables.authUserId === userId
      )
    }
  },
  SearchResult: {
    __resolveType: (obj, context, info) => {
      if (obj.fullName) {
        return 'User'
      }
      if (obj.title) {
        return 'Post'
      }
      return null
    }
  },
  UserPayload: {
    followerCount: (parent) => parent.followers.length,
    followingCount: (parent) => parent.following.length
  }
}

export default resolvers
