const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookPreview } from "../cmps/BookPreview.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { AddBook } from "../cmps/AddBook.jsx"

import { BookDetails } from "./BookDetails.jsx"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    console.log(filterBy)
    useEffect(() => {
        loadBooks()
    }, [filterBy])

    useEffect(() => {
        loadBooks()
    }, [])

    function onSetFilter(fieldsToUpdate) {
        console.log(fieldsToUpdate)
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }
    // function onSetFilter(filterBy) {
    //     setFilterBy(filterBy)
    // }

    function loadBooks() {
        bookService.query(filterBy).then((books) => {
            setBooks(books)
        })
    }

    if (!books) return <div>Loading...</div>
    return <section className="book-index">
        <BookFilter onSetFilter={onSetFilter} filterBy={filterBy} />
        <AddBook loadBooks={loadBooks} />
        <Link to="/book/edit"><button>Add Book</button></Link>
        <h1 className="our-books">Our Books</h1>
        <BookList
            books={books}
        />
    </section>
}