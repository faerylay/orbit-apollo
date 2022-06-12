import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  conversationOpened: false,
  profileOpened: false,
};
const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    CHAT_OPEN: (state, action) => {
      state.conversationOpened = action.payload
    },
    PROFILE_OPEN: (state, action) => {
      console.log(action.payload)
      state.profileOpened = action.payload
    }
  }
})


export const { CHAT_OPEN, PROFILE_OPEN } = chatSlice.actions
export default chatSlice.reducer

