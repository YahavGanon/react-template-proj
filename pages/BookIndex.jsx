const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookPreview } from "../cmps/BookPreview.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

import { BookDetails } from "./BookDetails.jsx"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectdBook] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function onSetFilter(fieldsToUpdate) {
        console.log(fieldsToUpdate)
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate}))
    }
    // function onSetFilter(filterBy) {
    //     setFilterBy(filterBy)
    // }

    function loadBooks() {
        bookService.query(filterBy).then((books) => {
            setBooks(books)
        })
    }

    function onSelectBook(book) {
        setSelectdBook(book)
    }

    if (!books) return <div>Loading...</div>
    return <section className="book-index">
        <BookFilter onSetFilter = {onSetFilter} filterBy={filterBy} />
        {!selectedBook && <React.Fragment><h1 className="our-books">Our Books</h1>
            <BookList
                books={books}
                onSelectBook={onSelectBook} /></React.Fragment>}

        {selectedBook && <BookDetails book={selectedBook} idx={0} onGoBack={() => onSelectBook(null)} />}

    </section>
}