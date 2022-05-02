import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp-date-unix'

const notificationSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  like: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like'
  },
  follow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Follow'
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  },
  commentlikes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commentlike'
  },
  seen: {
    type: Boolean,
    default: false
  }
})
notificationSchema.plugin(timestamps)

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification
