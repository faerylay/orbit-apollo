import { UserInputError } from 'apollo-server-express'
import { Follow, User } from '../models'
import { validateUserId } from '../validator'

const resolvers = {
  Mutation: {
    createFollow: async (parent, { input: { authorId } }, { req }, info) => {
      const { userId } = req.session
      validateUserId(authorId)
      const findUser = await User.findById(authorId)
        .populate({
          path: 'followers',
          populate: { path: 'follower' }
        })

      if (findUser) {
        const followUser = findUser.followers.find(author => author.follower._id.toString() === userId)
        if (followUser) {
          const followId = followUser._id
          const follow = await Follow.findByIdAndRemove(followId)
          await User.findOneAndUpdate({ _id: follow.author }, { $pull: { followers: follow.id } })
          await User.findOneAndUpdate({ _id: follow.follower }, { $pull: { following: follow.id } })
          return follow
        } else {
          const follow = await new Follow({ author: authorId, follower: userId }).save()
          await User.findOneAndUpdate({ _id: authorId }, { $push: { followers: follow.id } })
          await User.findOneAndUpdate({ _id: userId }, { $push: { following: follow.id } })
          return follow
        }
      } else {
        throw new UserInputError('author ID not found!')
      }
    }
  }
}

export default resolvers
