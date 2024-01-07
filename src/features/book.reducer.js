import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allBookData: [],
  userBook: [],
  searchedBook: [],
  refresh: false
}

export const userSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setAllBookData: (state, action) => {
      state.allBookData = action.payload
    },
    setUserBook: (state, action) => {
      state.userBook = action.payload
    },
    setSearchedBook: (state, action) => {
      state.searchedBook = action.payload
    },
    setRefresh: (state, action) => {
      state.refresh = !state.refresh
    }


  },
})

export const { setAllBookData, setUserBook, setSearchedBook, setRefresh } = userSlice.actions

export default userSlice.reducer