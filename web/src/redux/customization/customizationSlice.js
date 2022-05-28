import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  isOpen: [],
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 12,
  opened: true
};
const customizationSlice = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    MENU_OPEN: (state, action) => {
      state.isOpen = [action.payload]
    },
    SET_MENU: (state, action) => {
      state.opened = action.payload
    },
    SET_FONT_FAMILY: (state, action) => {
      state.fontFamily = action.payload
    },
    SET_BORDER_RADIUS: (state, action) => {
      state.borderRadius = action.payload
    }
  }
})

export const { MENU_OPEN, SET_MENU, SET_FONT_FAMILY, SET_BORDER_RADIUS } = customizationSlice.actions
export default customizationSlice.reducer

