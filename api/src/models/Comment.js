import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp-date-unix'

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  image: String,
  imagePublicId: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  commentlikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commentlike'
    }
  ],
  mentions: [
    {
      userId: { type: String },
      fullName: { type: String }
    }
  ]
  // replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "replies" }]
})

commentSchema.plugin(timestamps)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
