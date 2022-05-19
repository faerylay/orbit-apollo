import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  user: null
})

const usersSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addUser: {
      reducer(state, action) {
        return {
          ...state,
          user: action.payload,
        }
      }
    }
  }
})

export const { addUser } = usersSlice.actions
export default usersSlice.reducer

