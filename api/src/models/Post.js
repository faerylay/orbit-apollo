import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp-date-unix'

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: [String],
  imagePublicId: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  commentlikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commentlike'
    }
  ],
  postupdatedhistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Postupdatedhistory'
    }
  ]
  // tags: String,
})
postSchema.plugin(timestamps)

const Post = mongoose.model('Post', postSchema)
export default Post
