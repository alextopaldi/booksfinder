import { Link } from "react-router-dom";
import { IBook } from "../models/book";
import DOMPurify from 'dompurify';

export interface BookMainProps {
    book : IBook | undefined
}

export function BookMain({book} : BookMainProps) {

    const emptyPhoto = require('../media/empty.jpg')

    function BookDescription(description : string) {
        const cleanDescription = DOMPurify.sanitize(description, { ALLOWED_TAGS: [] });
        return <textarea readOnly value={cleanDescription}></textarea>;
      }

    function addImg() {
        if(book?.volumeInfo.imageLinks?.medium) {
            return book?.volumeInfo.imageLinks?.medium
        }
        else if(book?.volumeInfo.imageLinks?.thumbnail){
            return book?.volumeInfo.imageLinks?.thumbnail
        }
        else {
            return emptyPhoto
        }
    }

    return(
        <>
        <Link className="back-link" to='/'>Назад</Link>
        <div className="book-info">
            <div className="book-info__img">
                <img src={addImg()} alt="" />
            </div>
            <div className="book-info__text">
                {book?.volumeInfo.categories && <p className="book-cat">{book?.volumeInfo.categories.join('/')}</p>}
                {book?.volumeInfo.title && <p className="book-title">{book?.volumeInfo.title}</p>}
                {book?.volumeInfo.authors && <p className="book-auth">{book?.volumeInfo.authors?.join(', ')}</p>}
                {book?.volumeInfo.description && BookDescription(book.volumeInfo.description)}
            </div>
        </div>
        </>
    )
}