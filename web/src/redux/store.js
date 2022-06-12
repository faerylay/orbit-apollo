import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import chatReducer from './chat/chatSlice';
import customizationReducer from './customization/customizationSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    chat: chatReducer,
    customization: customizationReducer,
  }
})
