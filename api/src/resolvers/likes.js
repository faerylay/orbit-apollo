import { UserInputError } from 'apollo-server-express'
import { User, Post, Like } from '../models'
import { validatePostId, validateUser } from '../validator'
const resolvers = {
  Mutation: {
    createLike: async (parent, { input: { postId } }, { req }, info) => {
      const { userId } = req.session
      validatePostId(postId)
      await validateUser(userId)

      const findPost = await Post.findById(postId).populate('likes')
      if (findPost) {
        const likePost = findPost.likes.find(like => like.user.toString() === userId)
        if (likePost) {
          const like = await Like.findByIdAndRemove(likePost._id)
          await User.findOneAndUpdate({ _id: like.user }, { $pull: { likes: like.id } }, { new: true })
          await Post.findOneAndUpdate({ _id: like.post }, { $pull: { likes: like.id } }, { new: true })
          return like
        } else {
          const like = await new Like({ user: userId, post: postId }).save()
          await Post.findOneAndUpdate({ _id: postId }, { $push: { likes: like.id } }, { new: true })
          await User.findOneAndUpdate({ _id: userId }, { $push: { likes: like.id } }, { new: true })
          return like
        }
      } else {
        throw new UserInputError('Post not found ')
      }
    }
  }
}

export default resolvers
