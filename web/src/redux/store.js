import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice'
import customizationReducer from './customization/customizationSlice';

export default configureStore({
  reducer: {
    users: usersReducer,
    customization: customizationReducer,
  }
})
