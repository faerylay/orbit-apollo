import { UserInputError } from 'apollo-server-core'
import { Post, PostUpdatedHistory } from '../models'
import { validatePostId } from '../validator'
const resolvers = {
  Query: {
    postupdatedhistorys: async (parent, { postId }, context, info) => {
      validatePostId(postId)
      const findPost = await Post.findById(postId)
      if (findPost) {
        const postupdatedhistorys = await PostUpdatedHistory.find({ post: postId }).populate('user').populate('post').sort({ createdAt: -1 })
        if (postupdatedhistorys) {
          return postupdatedhistorys
        } else {
          throw new UserInputError('Can`t found Post Updated History')
        }
      } else {
        throw new UserInputError('Post not found ')
      }
    }
  },
  Mutation: {
    createPostUpdatedHistory: async (parent, { input: { userId, postId, title, description, image } }, context, info) => {
      validatePostId(postId)
      const findPost = await Post.findById(postId).populate('author')
      if (findPost && findPost.author.id === userId) {
        const updatedHistory = await new PostUpdatedHistory({ title, description, image, user: userId, post: postId }).save()
        await Post.findOneAndUpdate({ _id: postId }, { $push: { postupdatedhistory: updatedHistory.id } }, { new: true })
        return updatedHistory
      } else {
        throw new UserInputError('Post not found ')
      }
    }
  }
}

export default resolvers
