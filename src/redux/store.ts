import { combineReducers, configureStore } from "@reduxjs/toolkit";
import BooksSlice from "./reducers/BooksSlice";
import SearchValuesSlice from "./reducers/SearchValuesSlice";

const rootReduser = combineReducers({
    BooksSlice, SearchValuesSlice
})

export const setupStore = () => {
    return configureStore ({
        reducer: rootReduser
    })
}

export type RootState = ReturnType<typeof rootReduser>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']