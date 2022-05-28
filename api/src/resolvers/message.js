import mongoose from 'mongoose'
import { Message, User } from '../models'
import { withFilter } from 'graphql-subscriptions'
import { MESSAGE_CREATED, NEW_CONVERSATION } from '../constants/Subscriptions'
import pubSub from '../utils/Pubsub'

const resolvers = {
  Query: {
    getMessages: async (parent, { authUserId, userId }, context, info) => {
      const specificMessage = await Message.find()
        .and([
          { $or: [{ sender: authUserId }, { receiver: authUserId }] },
          { $or: [{ sender: userId }, { receiver: userId }] }
        ])
        .populate('sender')
        .populate('receiver')
        .sort({ updatedAt: 'asc' })
      return specificMessage
    },
    getConversations: async (parent, { authUserId }, context, info) => {
      // Get users with whom authUser had a chat
      const users = await User.findById(authUserId).populate('messages', 'id  fullName image isOnline')
      const latestReceiver = await Message.find({ receiver: mongoose.Types.ObjectId(authUserId), seen: false }).select('sender')
      // Get last messages with wom authUser had a chat
      const lastMessages = await Message.aggregate([
        {
          $match: {
            $or: [
              {
                receiver: mongoose.Types.ObjectId(authUserId)
              },
              {
                sender: mongoose.Types.ObjectId(authUserId)
              }
            ]
          }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $group: {
            _id: '$sender',
            doc: {
              $first: '$$ROOT'
            }
          }
        },
        { $replaceRoot: { newRoot: '$doc' } }
      ])
      // Attach message properties to users
      const conversations = []
      users.messages.map(u => {
        const user = {
          id: u.id,
          fullName: u.fullName,
          image: u.image,
          isOnline: u.isOnline,
          lastMessageCount: latestReceiver
        }
        const sender = lastMessages.find((m) => u._id.toString() === m.sender.toString())
        if (sender) {
          user.seen = sender.seen
          user.lastMessageCreatedAt = sender.createdAt
          user.lastMessage = sender.message
          user.lastMessageSender = false
        } else {
          const receiver = lastMessages.find((m) => u.id === m.receiver.toString())
          if (receiver) {
            user.seen = receiver.seen
            user.lastMessageCreatedAt = receiver.createdAt
            user.lastMessage = receiver.message
            user.lastMessageSender = true
          }
        }

        return conversations.push(user)
      })
      // Sort users by last created messages date (need to fix date)
      const sortedConversations = conversations.sort((a, b) =>
        b.lastMessageCreatedAt && b.lastMessageCreatedAt.toString().localeCompare(a.lastMessageCreatedAt)
      )
      return sortedConversations
    }
  },
  Mutation: {
    createMessage: async (parent, { input: { message, sender, receiver } }, { req }, info) => {
      let newMessage = await new Message({ message, sender, receiver }).save()
      newMessage = await newMessage.populate('sender')
      newMessage = await newMessage.populate('receiver')
      pubSub.publish(MESSAGE_CREATED, { messageCreated: newMessage })
      // Check if user already had a conversation
      // if not push their ids to users collection
      const senderUser = await User.findById(sender)
      if (!senderUser.messages.includes(receiver)) {
        await User.findOneAndUpdate({ _id: sender }, { $push: { messages: receiver } })
        await User.findOneAndUpdate({ _id: receiver }, { $push: { messages: sender } })
        newMessage.isFirstMessage = true
      }
      // Publish message created event
      pubSub.publish(NEW_CONVERSATION, {
        newConversation: {
          receiverId: receiver,
          id: senderUser.id,
          username: senderUser.username,
          fullName: senderUser.fullName,
          image: senderUser.image,
          isOnline: senderUser.isOnline,
          seen: false,
          lastMessage: newMessage.message,
          lastMessageSender: false,
          lastMessageCreatedAt: newMessage.createdAt
        }
      })
      return newMessage
    },
    updateMessageSeen: async (parent, { input: { sender, receiver } }, { req }, info) => {
      try {
        await Message.updateOne({ receiver, sender, seen: false }, { seen: true }, { multi: true })
        return true
      } catch (e) {
        return false
      }
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(MESSAGE_CREATED),
        (payload, variables) => {
          const { sender, receiver } = payload.messageCreated
          const { authUserId, userId } = variables

          const isAuthUserSenderOrReceiver = authUserId === sender.id || authUserId === receiver.id
          const isUserSenderOrReceiver = userId === sender.id || userId === receiver.id

          return isAuthUserSenderOrReceiver && isUserSenderOrReceiver
        }
      )
    },
    newConversation: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(NEW_CONVERSATION),
        (payload, variables, { authUser }) => authUser && authUser.id === payload.newConversation.receiverId
      )
    }
  }
}

export default resolvers
