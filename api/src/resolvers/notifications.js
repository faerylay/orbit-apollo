import { withFilter } from 'graphql-subscriptions'
import pubSub from '../utils/Pubsub'
import { NOTIFICATION_CREATED_OR_DELETED } from '../constants/Subscriptions'
import { Notification, User, Follow } from '../models'

const resolvers = {
  Query: {
    getUserNotifications: async (parent, { userId, offset, limit }, context, info) => {
      const query = { user: userId, seen: false }
      const count = await Notification.where(query).countDocuments()
      const notifications = await Notification.where({ user: userId })
        .populate('author')
        .populate('user')
        .populate('mention')
        .populate('follow')
        .populate('post')
        .populate({ path: 'commentlikes', populate: { path: 'comment' } })
        .populate({ path: 'comment', populate: { path: 'post' } })
        .populate({ path: 'like', populate: { path: 'post' } })
        .skip(offset)
        .limit(limit)
        .sort({ createdAt: 'desc' })
      return { notifications, count }
    }
  },
  Mutation: {
    createNotification: async (parent, { input: { userId, authorId, postId, mentions, commentId, notificationType, notificationTypeId } }, context, info) => {
      let newNotification
      if (notificationType === 'POSTCREATED') {
        const followerUsers = await Follow.find({ author: userId })
        for (const follower of followerUsers) {
          newNotification = await Notification.create([{
            author: authorId,
            user: follower.follower,
            post: postId,
            comment: commentId,
            [notificationType.toLowerCase()]: notificationTypeId
          }])
        }
        newNotification = newNotification[0]
        for (const follower of followerUsers) {
          await User.updateMany({ _id: follower.follower }, {
            $push: { notifications: newNotification.id }
          })
        }
      }

      if (notificationType === 'COMMENT') {
        if (mentions.length) {
          for (const mention of mentions) {
            newNotification = await Notification.create([{
              author: authorId,
              user: mention,
              mention: mention,
              post: postId,
              comment: commentId,
              [notificationType.toLowerCase()]: notificationTypeId
            }])
          }
          newNotification = newNotification[0]
          for (const mention of mentions) {
            await User.updateMany({ _id: mention }, {
              $push: { notifications: newNotification.id }
            })
          }
        } else {
          newNotification = await new Notification({
            author: authorId,
            user: userId,
            post: postId,
            comment: commentId,
            [notificationType.toLowerCase()]: notificationTypeId
          }).save()
          await User.findOneAndUpdate({ _id: userId }, { $push: { notifications: newNotification.id } })
        }
      } else {
        newNotification = await new Notification({
          author: authorId,
          user: userId,
          post: postId,
          comment: commentId,
          [notificationType.toLowerCase()]: notificationTypeId
        }).save()
        await User.findOneAndUpdate({ _id: userId }, { $push: { notifications: newNotification.id } })
      }
      newNotification = await newNotification.populate('author')
      newNotification = await newNotification.populate('follow')
      newNotification = await newNotification.populate({ path: 'comment', populate: { path: 'post' } })
      newNotification = await newNotification.populate({ path: 'like', populate: { path: 'post' } })

      pubSub.publish(NOTIFICATION_CREATED_OR_DELETED, {
        notificationCreatedOrDeleted: {
          operation: 'CREATE',
          notification: newNotification
        }
      })
      return newNotification
    },
    deleteNotification: async (parent, { input: { id } }, context, info) => {
      let notification = await Notification.findByIdAndRemove(id)
      await User.findOneAndUpdate({ _id: notification.user }, { $pull: { notifications: notification.id } })
      notification = await notification.populate('author')
      notification = await notification.populate('follow')
      notification = await notification.populate({ path: 'comment', populate: { path: 'post' } })
      notification = await notification.populate({ path: 'like', populate: { path: 'post' } })

      pubSub.publish(NOTIFICATION_CREATED_OR_DELETED, {
        notificationCreatedOrDeleted: {
          operation: 'DELETE',
          notification
        }
      })
      return notification
    },
    updateNotificationSeen: async (parent, { input: { userId, notiId } }, context, info) => {
      try {
        const data = await Notification.findOneAndUpdate({ _id: notiId, user: userId, seen: false }, { seen: true })
        return data
      } catch (e) {
        return false
      }
    }
  },
  Subscription: {
    notificationCreatedOrDeleted: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(NOTIFICATION_CREATED_OR_DELETED),
        (payload, variables, { userId }) => {
          const payloadUserId = payload.notificationCreatedOrDeleted.notification.user.toString()
          return userId && userId === payloadUserId
        }
      )
    }
  }
}
export default resolvers
