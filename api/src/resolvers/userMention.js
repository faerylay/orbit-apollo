import { UserInputError } from 'apollo-server-express'
import { Follow, User, Comment, Post } from '../models'

const resolvers = {
  Query: {
    userMentionSearch: async (parent, { searchQuery, postId }, { req }, info) => {
      const { userId } = req.session
      if (!searchQuery) return []
      const post = await Post.findById(postId)
      const findFollowed = await Follow.find({ follower: userId })
      const followedIds = findFollowed.map(follow => follow.author)
      const findFollowedUser = await User.find({
        fullName: new RegExp(searchQuery, 'i'),
        // fullName: { $regex: '^' + searchQuery, $options: 'i' },
        $and: [
          { _id: { $in: followedIds } }
        ]
      })
      if (post) {
        const findCommented = await Comment.find({ post: postId })
        const commentedIds = findCommented.map(comment => comment.author)
        const findCommentedUser = await User.find({
          fullName: new RegExp(searchQuery, 'i'),
          _id: {
            $ne: userId
          },
          $and: [
            { _id: { $in: commentedIds } }
          ]
        })

        const dupliteResult = [...findFollowedUser, ...findCommentedUser]
        const ids = dupliteResult.map(o => o.id)
        const filtered = dupliteResult.filter(({ id }, index) => !ids.includes(id, index + 1))
        return filtered
      } else {
        throw new UserInputError(`${postId} is not a valid Post Id`)
      }
    }
  }
}

export default resolvers
