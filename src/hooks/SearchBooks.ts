import axios from "axios"
import { useEffect, useState } from "react"
import { IBook } from "../models/book"
import { BooksSlice } from "../redux/reducers/BooksSlice"
import { SearchValuesSlice } from "../redux/reducers/SearchValuesSlice"
import { useAppDispatch, useAppSelector } from "./Redux"

export function useSearchBooks() {

    const {changeStartIndex} = SearchValuesSlice.actions
    const {values} = useAppSelector(state => state.SearchValuesSlice)
    const key = process.env.REACT_APP_API_KEY;
    const baseURL = "https://www.googleapis.com/books/v1/volumes?q="+values.searchValue+"&startIndex="+values.startIndex+"&maxResults=30&orderBy="+values.sort+"&key="
    const catURL = "https://www.googleapis.com/books/v1/volumes?q="+values.searchValue+"+subject:"+values.category+"&startIndex="+values.startIndex+"&maxResults=30&orderBy="+values.sort+"&key="
    const dispatch = useAppDispatch()
    const {addBooks, deleteBooks, addCount} = BooksSlice.actions
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [book, setBook] = useState<IBook>()
    
    function searchBooks(first : boolean) {
        if (first) {
            dispatch(deleteBooks())
            fetchBooks()
        }
        else {
            fetchBooks()
        }
      }

    async function fetchBooks() {
        setError(false)
        setLoader(true)
        setEmpty(false)
        try {
            if(values.category == 'all') {
                const response = await axios.get(
                baseURL+key
                )
                if (response.data.totalItems == 0) {
                    setEmpty(true)
                    setLoader(false)
                    return
                }
                const booksData = response.data.items
                booksData.map((item : any) => dispatch(addBooks({id : item.id, volumeInfo : item.volumeInfo})))
                dispatch(addCount(response.data.totalItems))
                dispatch(changeStartIndex())
            }
            else {
                setLoader(true)
                const response = await axios.get(
                catURL+key
                )
                if (response.data.totalItems == 0) {
                    setEmpty(true)
                    setLoader(false)
                    return
                }
                const booksData = response.data.items
                booksData.map((item : any) => dispatch(addBooks({id : item.id, volumeInfo : item.volumeInfo})))
                dispatch(changeStartIndex())
            }
        setLoader(false)
        } catch (error) {
            setEmpty(false)
            setLoader(false)
            setError(true)
        }
    }

    async function fetchBook(id : string) {
        const idURL = "https://www.googleapis.com/books/v1/volumes/"+id+"?key="+key
        setError(false)
        setLoader(true)
        try {
            const response = await axios.get(idURL)
            console.log(response.data)
            setBook({id : response.data.id, volumeInfo: response.data.volumeInfo})
            setLoader(false)
        } catch (error) {
            setLoader(false)
            setError(true)
        }
    }
    

      return {searchBooks, loader, error, empty, fetchBook, book}
}