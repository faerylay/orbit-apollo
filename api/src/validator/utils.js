import { AuthenticationError } from 'apollo-server-express'
import mongoose from 'mongoose'
import { User } from '../models'

export const validatePostId = (postId) => {
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    throw new Error(`${postId} is not a valid post ID`)
  }
}
export const validateUser = async (userId) => {
  const user = await User.findById(userId)
  if (!user) throw new AuthenticationError('You must be signed in.')
}
export const validateUserId = (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error(`${userId} is not a valid user ID`)
  }
}

export const validateCommentId = (commentId) => {
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new Error(`${commentId} is not a valid comment ID`)
  }
}
