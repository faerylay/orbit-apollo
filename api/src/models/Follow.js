import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp-date-unix'

const followSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})
followSchema.plugin(timestamps)
const Follow = mongoose.model('Follow', followSchema)

export default Follow
