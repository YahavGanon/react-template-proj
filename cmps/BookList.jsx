const { Link } = ReactRouterDOM

import { BookPreview } from "../cmps/BookPreview.jsx"

export function BookList({ books }) {
    return <ul className="book-list clean-list">
        {books.map((book, i) => <li className="li-list" key={book.id}>
            <Link to={`/book/${book.id}`}>
                <BookPreview idx={i} book={book} />
                <button>Read</button>
            </Link>
            <Link to={`/book/edit/${book.id}`}><button>Edit Book</button></Link>
            <div className="book-actions">
            </div></li>)}
    </ul>
}