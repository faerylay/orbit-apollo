import { UserInputError } from 'apollo-server-express'
import { Comment, Post, User } from '../models'
import { validatePostId, validateCommentId, validateUser } from '../validator'
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary'
const resolvers = {
  Query: {
    comments: async (parent, args, context, info) => {
      const comments = await Comment.find({})
        .populate('author')
        .populate({
          path: 'commentlikes',
          populate: [
            { path: 'user' },
            { path: 'comment' }
          ]
        }).sort({ createdAt: -1 })
      return comments
    }
  },
  Mutation: {
    createComment: async (parent, { input: { postId, comment, image, mentions } }, { req }, info) => {
      const { userId } = req.session
      validatePostId(postId)
      await validateUser(userId)
      // TODO: Post exists
      const post = await Post.findById(postId)
      let imageUrl, imagePublicId
      if (image) {
        const { createReadStream } = await image
        const stream = createReadStream()
        const uploadImage = await uploadToCloudinary(stream, 'comment')
        if (!uploadImage.secure_url) {
          throw new Error('Something went wrong while uploading image to Cloudinary')
        }
        imageUrl = uploadImage.secure_url
        imagePublicId = uploadImage.public_id
      }
      if (post) {
        const newComment = await new Comment({
          author: userId,
          post: postId,
          comment,
          image: imageUrl,
          imagePublicId,
          mentions
        }).save()

        await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: newComment.id } }, { new: true })
        await User.findOneAndUpdate({ _id: userId }, { $push: { comments: newComment.id } }, { new: true })
        return newComment
      } else {
        throw new UserInputError(`${postId} is not a valid Post Id`)
      }
    },
    // TODO: update
    updateComment: async (parent, { input: { postId, commentId, comment } }, { req }, info) => {
      const { userId } = req.session
      validatePostId(postId)
      validateCommentId(commentId)

      const findPost = await Post.findById(postId)
      const findComment = await Comment.findById(commentId)
      if (findPost && findComment) {
        const commentByAuthor = await Comment.find({ author: userId }).populate('author')
        const cmt = commentByAuthor.find(comment => comment._id.toString() === commentId)
        if (cmt) {
          const updatedComment = await Comment.findByIdAndUpdate(commentId, {
            comment
          }, { new: true })
          return updatedComment
        } else {
          throw new UserInputError('User is not valid commentId')
        }
      } else {
        throw new UserInputError(`${postId} is not a valid Post or Comment Id`)
      }
    },
    deleteComment: async (parent, { input: { postId, commentId, imagePublicId } }, { req }, info) => {
      const { userId } = req.session
      validatePostId(postId)
      validateCommentId(commentId)
      // TODO: first step validate commentID in moongoose done ...
      // TODO: second step user`s comment ids and commentId are same done...
      // TODO: third step if post ID exist and post comment id and commentId are same done..
      // TODO: if user`s comments id and commentID are same but user only want to delete user given commentID not user`s comments ids not many just only one validate (may be not sure to need validate)
      const findPost = await Post.findById(postId)
      const findComment = await Comment.findById(commentId)
      if (imagePublicId) {
        const deleteImage = await deleteFromCloudinary(imagePublicId)
        if (deleteImage.result !== 'ok') {
          throw new Error('Something went wrong while deleting image from Cloudinary')
        }
      }
      if (findPost && findComment) {
        const commentByAuthor = await Comment.find({ author: userId }).populate('author')
        const cmt = commentByAuthor.find(comment => comment._id.toString() === commentId)
        if (cmt) {
          const comment = await Comment.findByIdAndRemove(commentId)
          await User.findOneAndUpdate({ _id: comment.author }, { $pull: { comments: comment.id } })
          await Post.findOneAndUpdate({ _id: comment.post }, { $pull: { comments: comment.id } })
          return comment
        } else {
          throw new UserInputError('User is not valid commentId')
        }
      } else {
        throw new UserInputError(`${postId} is not a valid Post or Comment Id`)
      }
    }
  }
}

export default resolvers
