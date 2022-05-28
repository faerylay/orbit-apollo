import { useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux'
import { CREATE_NOTIFICATION, DELETE_NOTIFICATION, GET_USER_NOTIFICATION, ME, FETCH_POSTS_QUERY } from '../graphql';
import { NOTI_PAGE_NOTIFICATION_LIMIT } from '../constants/DataLimit'

const useNotifications = () => {
  const auth = useSelector(state => state?.users?.user)
  const client = useApolloClient()

  const variable = {
    userId: auth?.id,
    offset: 0,
    limit: NOTI_PAGE_NOTIFICATION_LIMIT,
  };
  const mutate = async (mutation, variables) => {
    try {
      return await client.mutate({
        mutation,
        variables: { input: { ...variables } },
        refetchQueries: () => [
          { query: ME },
          { query: FETCH_POSTS_QUERY },
          { query: GET_USER_NOTIFICATION, variables: variable }
        ]
      });
    } catch (error) {
      console.error('Error while mutating a notification', error);
    }
  };
  const create = ({ userId, postId, notificationType, notificationTypeId }) => {
    return mutate(CREATE_NOTIFICATION, {
      authorId: auth?.id,
      userId,
      postId,
      notificationType,
      notificationTypeId,
    });
  };

  const remove = ({ notificationId }) => mutate(DELETE_NOTIFICATION, {
    id: notificationId
  });

  const toggle = ({ user, postId, commentId, notificationType, notificationTypeId, hasDone }) => {
    const type = notificationType.toLowerCase();
    const isNotified = user?.notifications?.find((n) => n[type] && hasDone && n[type]?.id === hasDone?.id);
    const notificationId = isNotified ? isNotified?.id : null;
    const operation = notificationId ? 'delete' : 'create';
    const options = {
      create: {
        mutation: CREATE_NOTIFICATION,
        variables: {
          authorId: auth?.id,
          userId: user.id,
          postId,
          commentId,
          notificationType,
          notificationTypeId,
        }
      },
      delete: {
        mutation: DELETE_NOTIFICATION,
        variables: { id: notificationId }
      },
    };

    return mutate(options[operation].mutation, options[operation].variables);
  };
  return { create, remove, toggle };
}
export default useNotifications 