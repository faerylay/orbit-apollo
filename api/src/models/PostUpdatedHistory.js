import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp-date-unix'
const postUpdatedHistorySchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'Post'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
})
postUpdatedHistorySchema.plugin(timestamps)
const PostUpdatedHistory = mongoose.model('Postupdatedhistory', postUpdatedHistorySchema)

export default PostUpdatedHistory
