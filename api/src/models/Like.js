import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Types.ObjectId,
    ref: 'Post'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Like = mongoose.model('Like', likeSchema)

export default Like
