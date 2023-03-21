import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchValues } from "../../models/searchValues";

interface UserProductState {
    values : ISearchValues,
    changed : boolean
}

const initialState: UserProductState = {
    values : {
        searchValue : '',
        startIndex : 0,
        category : 'all',
        sort : 'relevance'
    },
    changed : false
}

export const SearchValuesSlice = createSlice({
    name: 'data',
    initialState,
    reducers : {
        changeSearchValue(state, action : PayloadAction<string>) {
            state.values.searchValue = action.payload
        },
        changeStartIndex(state) {
            state.values.startIndex += 30
        },
        changeCategory(state, action : PayloadAction<string>) {
            state.values.category = action.payload
        },
        changeSort(state, action : PayloadAction<string>) {
            state.values.sort = action.payload
        },
        clearValues(state) {
            state.values = initialState.values
        },
        clearStartIndex(state) {
            state.values.startIndex = 0
        }
    }
})

export default SearchValuesSlice.reducer