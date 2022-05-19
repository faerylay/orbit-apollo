import { UserInputError } from 'apollo-server-express'
import { User, Comment, CommentLike } from '../models'
import { validateUser, validateCommentId } from '../validator'

const resolvers = {
  Mutation: {
    createCommentLikes: async (parent, { input: { commentId } }, { req }, info) => {
      const { userId } = req.session
      validateCommentId(commentId)
      await validateUser(userId)

      const findComment = await Comment.findById(commentId).populate('commentlikes')
      if (findComment) {
        const likeComment = findComment.commentlikes.find(commentlikes => commentlikes.user.toString() === userId)

        if (likeComment) {
          const like = await CommentLike.findByIdAndRemove(likeComment._id)
          await User.findOneAndUpdate({ _id: like.user }, { $pull: { commentlikes: like.id } }, { new: true })
          await Comment.findOneAndUpdate({ _id: like.comment }, { $pull: { commentlikes: like.id } }, { new: true })
          return like
        } else {
          const like = await new CommentLike({ user: userId, comment: commentId }).save()
          await Comment.findOneAndUpdate({ _id: commentId }, { $push: { commentlikes: like.id } }, { new: true })
          await User.findOneAndUpdate({ _id: userId }, { $push: { commentlikes: like.id } }, { new: true })
          return like
        }
      } else {
        throw new UserInputError('Comment not found ')
      }
    }
  }
}

export default resolvers
