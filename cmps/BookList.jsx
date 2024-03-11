import { BookPreview } from "../cmps/BookPreview.jsx"

export function BookList({books, onSelectBook}){
    return <ul className="book-list clean-list">
{books.map((book,i) => <li className="li-list" key={book.id}><BookPreview idx={i} book={book}/>
<div className="book-actions">
    <button onClick={() => { onSelectBook(book)}}>Read</button>
    </div></li>)}
    </ul>
}