import { BookPrev } from "../components/BookPrev";
import { Loader } from "../components/Loader";
import { Searchbar } from "../components/SearchBar";
import { useAppSelector } from "../hooks/Redux";
import { useSearchBooks } from "../hooks/SearchBooks";

export function MainPage() {

    const {books, count} = useAppSelector(state => state.BooksSlice)
    const {searchBooks, loader, error} = useSearchBooks()

    
    return(
        <>
        {loader && <Loader/>}
        {error && <p className="server-message">Server error</p>}
        <div className="wrapper">
            <div className="container">
                <Searchbar/>
                {books.length!=0 && count!=0 && <p className="res-count">Found {count} results</p>}
                <div className="books">
                    {books.map(book => <BookPrev key={book.id} book={book}/>)}
                </div>
                {books.length!=0 && <button className="more-btn" onClick={() => searchBooks(false)}>Show more</button>}
            </div>
        </div>
        </>
    )
}