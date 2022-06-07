import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    // trim: true,
    // unique: true,
    validate: {
      validator: email => User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken`
    }
  },
  password: String,
  image: String,
  imagePublicId: String,
  coverImage: String,
  coverImagePublicId: String,
  bio: String,
  isOnline: {
    type: Boolean,
    default: false
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
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
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Follow'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Follow'
    }
  ],
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notification'
    }
  ],
  // passwordResetToken: String,
  // passwordResetTokenExpiry: Date,
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return bcrypt.compare(password, this.password)
}
// user authen and authorization with jwt token
const User = mongoose.model('User', userSchema)

export default User
