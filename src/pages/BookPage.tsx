import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookMain } from "../components/BookMain";
import { Loader } from "../components/Loader";
import { useAppSelector } from "../hooks/Redux";
import { useSearchBooks } from "../hooks/SearchBooks";
import { IBook } from "../models/book";

export function BookPage() {
    const { id } = useParams();
    const {fetchBook, book, loader, error} = useSearchBooks()

    useEffect(() => {
        if (id) {
            fetchBook(id)
        }
    },[])

    return(
        <>
        {loader && <Loader/>}
        <div className="wrapper">
            <div className="container">
                {error && <p className="server-message">Server error</p>}
                <BookMain book={book}/>
            </div>
        </div>
        </>
    )
}