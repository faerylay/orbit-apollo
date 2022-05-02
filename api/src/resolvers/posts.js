import { UserInputError } from 'apollo-server-express'
import { Post, User, Like, Comment, Notification, Follow, PostUpdatedHistory } from '../models'
import { postValidate, validatePostId } from '../validator'
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary'
const resolvers = {
  Query: {
    getPost: async (parent, { postId }, context, info) => {
      validatePostId(postId)
      const post = await Post.findById(postId)
        .populate({
          path: 'author',
          populate: [
            { path: 'posts' },
            {
              path: 'notifications',
              populate: [
                { path: 'author' },
                { path: 'follow' },
                { path: 'like' },
                { path: 'comment' },
                { path: 'commentlikes' }
              ]
            }
          ]
        })
        .populate({
          path: 'likes',
          populate: [
            { path: 'user' },
            { path: 'post' }
          ]
        })
        .populate({
          path: 'comments',
          options: { sort: { createdAt: -1 } },
          populate: [
            { path: 'author' },
            {
              path: 'commentlikes',
              populate: ['user', 'comment']
            }
          ]
        })
      if (!post) throw new Error('Post Not found...')
      return post
    },
    getPosts: async (parent, args, { req }, info) => {
      const post = await Post.find({})
        .populate({
          path: 'author',
          populate: [
            { path: 'posts' },
            {
              path: 'notifications',
              populate: [{ path: 'author' }, { path: 'follow' }, { path: 'like' }, { path: 'comment' }, { path: 'commentlikes' }]
            }
          ]
        })
        .populate({
          path: 'likes',
          populate: [
            { path: 'user' },
            { path: 'post' }
          ]
        })
        .populate({
          path: 'comments',
          options: { sort: { createdAt: -1 } },
          populate: { path: 'author' }
        })
        .sort({ createdAt: -1 })
      if (!post) throw new Error(`${post} is something wrong`)
      return post
    },
    getFollowedPosts: async (parent, { userId, offset, limit }, context, info) => {
      const userFollowing = []
      const follow = await Follow.find({ follower: userId }).select('author')
      follow.map((f) => userFollowing.push(f.author))
      // Find user posts and followed posts by using userFollowing ids array
      const query = {
        $or: [{ author: { $in: userFollowing } }, { author: userId }]
      }
      const followedPostsCount = await Post.find(query).countDocuments()
      const followedPosts = await Post.find(query)
        .populate({
          path: 'author',
          populate: [
            { path: 'following' },
            { path: 'followers' },
            {
              path: 'notifications',
              populate: [{ path: 'author' }, { path: 'follow' }, { path: 'like' }, { path: 'comment' }, { path: 'commentlikes' }]
            }
          ]
        })
        .populate({
          path: 'likes',
          populate: [
            { path: 'user' },
            { path: 'post' }
          ]
        })
        .populate({
          path: 'comments',
          options: { sort: { createdAt: 'desc' } },
          populate: { path: 'author' }
        })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: 'desc' })
      return { posts: followedPosts, count: followedPostsCount }
    },
    getUserPosts: async (parent, { userId, offset, limit }, context, info) => {
      // validateUser(userId)
      const user = await User.findOne({ _id: userId }).select('_id')
      const query = { author: user._id }
      const count = await Post.find(query).countDocuments()
      const posts = await Post.find(query)
        .populate({
          path: 'author',
          populate: [
            { path: 'following' },
            { path: 'followers' },
            {
              path: 'notifications',
              populate: [{ path: 'author' }, { path: 'follow' }, { path: 'like' }, { path: 'comment' }, { path: 'commentlikes' }]
            }
          ]
        })
        .populate({
          path: 'likes',
          populate: [
            { path: 'user' },
            { path: 'post' }
          ]
        })
        .populate({
          path: 'comments',
          options: { sort: { createdAt: 'desc' } },
          populate: { path: 'author' }
        })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: 'desc' })

      return { posts, count }
    }
  },
  Mutation: {
    createPost: async (parent, { input: { title, description, image } }, { req }, info) => {
      const { userId } = req.session
      await postValidate.validateAsync({ title, description }, { abortEarly: false })
      const imageUrl = []
      const imagePublicId = []

      if (image) {
        for (let i = 0; i < image.length; i++) {
          const { createReadStream } = await image[i]
          const stream = createReadStream()
          const uploadImage = await uploadToCloudinary(stream, 'post')
          if (!uploadImage.secure_url) {
            throw new Error('Something went wrong while uploading image to Cloudinary')
          }
          imageUrl.push(uploadImage.secure_url)
          imagePublicId.push(uploadImage.public_id)
        }
      }

      let newPost = await new Post({
        author: userId,
        title,
        description,
        image: imageUrl,
        imagePublicId
      }).save()
      newPost = await newPost.populate('author')
      await User.findOneAndUpdate({ _id: userId }, { $push: { posts: newPost.id } })
      if (newPost) {
        return newPost
      } else {
        throw new Error(`${newPost} is something failed with creating post`)
      }
    },
    updatePost: async (parent, { input: { postId, title, description, image, imagePublicId } }, { req }, info) => {
      const { userId } = req.session
      validatePostId(postId)
      await postValidate.validateAsync({ title, description }, { abortEarly: false })
      const findPost = await Post.findById(postId).populate('author')

      let imageUrl
      if (image) {
        const { createReadStream } = await image
        const stream = createReadStream()
        const updateImage = await uploadToCloudinary(stream, 'post', imagePublicId)
        if (!updateImage.secure_url) {
          throw new Error('Something went wrong while updating image to Cloudinary')
        }
        imageUrl = updateImage.secure_url
        imagePublicId = updateImage.public_id
      }

      if (findPost && findPost.author.id === userId) {
        const updatePost = await Post.findByIdAndUpdate(postId, {
          title,
          description,
          image: imageUrl,
          imagePublicId
        }, { new: true })
          .populate('author')
          .populate('likes')
          .populate('comments')
        if (updatePost) {
          return updatePost
        } else {
          throw new UserInputError('something wrong')
        }
      } else {
        throw new UserInputError(`${postId}  with the given ID not found`)
      }
    },
    deletePost: async (parent, { input: { postId, imagePublicId } }, { req }, info) => {
      const { userId } = req.session
      validatePostId(postId)
      const findPost = await Post.findById(postId).populate('author')
      if (imagePublicId) {
        const deleteImage = await deleteFromCloudinary(imagePublicId)
        if (deleteImage.result !== 'ok') {
          throw new Error('Something went wrong while deleting image from Cloudinary')
        }
      }
      if (findPost && findPost.author.id === userId) {
        const post = await Post.findByIdAndRemove(postId)
          .populate({ path: 'author', populate: { path: 'posts' } })
          .populate('likes')
          .populate({ path: 'comments', options: { sort: { createdAt: -1 } }, populate: { path: 'author' } })
        await User.findOneAndUpdate({ _id: post.author }, { $pull: { posts: post.id } })
        await PostUpdatedHistory.find({ post: post.id }).deleteMany()
        await Like.find({ post: post.id }).deleteMany()
        post.likes.map(async (likeId) => {
          return await User.find({ likes: likeId._id }).updateMany({
            $pull: { likes: likeId._id }
          })
        })

        await Comment.find({ post: post.id }).deleteMany()
        post.comments.map(async (commentId) => {
          return await User.find({ comments: commentId._id }).updateMany({
            $pull: { comments: commentId._id }
          })
        })

        const userNotifications = await Notification.find({ post: post.id })
        userNotifications.map(async (notification) => {
          await User.where({ notifications: notification.id }).updateMany({
            $pull: { notifications: notification._id }
          })
        })

        await Notification.find({ post: post.id }).deleteMany()

        if (post) {
          return post
        } else {
          throw new UserInputError('something wrong')
        }
      } else {
        throw new UserInputError(`${postId}  with the given ID not found`)
      }
    }
  },
  PostPayload: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  }
}

export default resolvers
