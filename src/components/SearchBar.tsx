import { useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/Redux"
import { useSearchBooks } from "../hooks/SearchBooks"
import { SearchValuesSlice } from "../redux/reducers/SearchValuesSlice"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Loader } from "./Loader"


export function Searchbar() {

    const dispatch = useAppDispatch()
    const {changeCategory, changeSearchValue, changeSort, clearStartIndex} = SearchValuesSlice.actions
    const {values} = useAppSelector(state => state.SearchValuesSlice)
    const {searchBooks, loader, error, empty} = useSearchBooks()
    const firstRender = useRef(true)

    function submitHandler(event : React.FormEvent) {
        event.preventDefault()
        searchBooks(true)
    }

    useEffect(() => {
        if (!firstRender.current) {
            dispatch(clearStartIndex())
        }
        else {
            firstRender.current = false
        }
        
    },[values.category, values.searchValue, values.sort])

 
    
    return (
        <>
        {loader && <Loader/>}
        <div className="search">
            <form className="search-form" onSubmit={submitHandler} action="">
                <input required placeholder="Find book..." type="text" value={values.searchValue} onChange={event => dispatch(changeSearchValue(event.target.value))} />
                <button>
                    <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass}/>
                </button>
            </form>
            <div className="search-selects">
                <div className="search-selects__preview">
                    <p>Categories</p>
                    <select value={values.category} onChange={event => dispatch(changeCategory(event.target.value))}>
                        <option value="all">All</option>
                        <option value="art">Art</option>
                        <option value="biography">Biography</option>
                        <option value="computers">Computers</option>
                        <option value="history">History</option>
                        <option value="medical">Medical</option>
                        <option value="poetry">Poetry</option>
                    </select>
                </div>
                <div className="search-selects__preview">
                    <p>Sorting by</p>
                    <select value={values.sort} onChange={event => dispatch(changeSort(event.target.value))}>
                        <option value="relevance">Relevance</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
            </div>
            {error && <p className="server-message">Server error</p>}
            {empty && <p className="server-message">No results</p>}
        </div>
        </>
    )
}