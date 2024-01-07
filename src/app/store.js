import { configureStore } from '@reduxjs/toolkit'
import bookReducer from '../features/book.reducer'


export const store = configureStore({
    reducer: {
        books: bookReducer
    },
})