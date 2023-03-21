import { useNavigate } from "react-router-dom"
import { IBook } from "../models/book"

interface BookPreviewProps {
    book : IBook
}

export function BookPrev({book} : BookPreviewProps) {

    const emptyPhoto = require('../media/empty.jpg')
    const navigate = useNavigate()

    return(
        <>
        <div className="book-preview" onClick={() => navigate('/'+book.id)}>
            <img className="small-img" src={book.volumeInfo.imageLinks?.smallThumbnail? book.volumeInfo.imageLinks?.smallThumbnail : emptyPhoto} alt='' />
            <p>{book.volumeInfo.title}</p>
            <p>{book.volumeInfo.categories && book.volumeInfo.categories[0]}</p>
            {(book.volumeInfo.authors && (book.volumeInfo.authors.length > 1)) ? <p>{book.volumeInfo.authors.join(', ')}</p> : <p>{book.volumeInfo.authors}</p>}
        </div>
        </>
    )
}