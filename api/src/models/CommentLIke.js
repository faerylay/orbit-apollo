import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp-date-unix'

const commentLikeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

commentLikeSchema.plugin(timestamps)
const CommentLike = mongoose.model('Commentlike', commentLikeSchema)

export default CommentLike
