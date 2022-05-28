import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp-date-unix'

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  message: String,
  seen: {
    type: Boolean,
    default: false
  }
})

messageSchema.plugin(timestamps)

const Message = mongoose.model('Message', messageSchema)

export default Message
