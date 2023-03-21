import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../models/book";

interface UserProductState {
    books : IBook[],
    count : number
}

const initialState: UserProductState = {
    books : [],
    count : 0
}

export const BooksSlice = createSlice({
    name: 'data',
    initialState,
    reducers : {
        addBooks(state, action : PayloadAction<IBook>) {
            state.books.push(action.payload)
        },
        deleteBooks(state) {
            state.books = []
        },
        addCount(state, action : PayloadAction<number>) {
            state.count = action.payload
        }
    }
})

export default BooksSlice.reducer