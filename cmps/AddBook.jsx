const { useState } = React

import { bookService } from "../services/book.service.js"
import { ApiBooks } from '../demoApiBooks.js'

export function AddBook({ loadBooks }) {
    const [books, setBooKSFromApi] = useState(ApiBooks)
    const filterdBooks = books.map(({ id, volumeInfo: { title } }) => ({ id, title }))

    function callGoogleApiBooks(ev) {
        ev.preventDefault()
        console.log(ev.target.value)
        if (ev.target.value.length < 3) return
        console.log('yes daddy')
        let api = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${ev.target.value}`
        return axios.get(api).then(res => {
            console.log('res', res)
            const googleBooks = res.data.items
            const firstFiveObjects = googleBooks.slice(0, 5)
            setBooKSFromApi(firstFiveObjects)
        })
    }

    function addBook(bookId) {
        const selectedBook = books.find(book => book.id === bookId)
        bookService.addGoogleBook(selectedBook)
            .then(savedBook => {
                console.log('savedbook', savedBook)
                loadBooks()
            })
            .catch(err => {
                console.log('Had issues saving book', err)
            })

    }


    return (
        <form onSubmit={callGoogleApiBooks} className='api-books'>
            <input type="text" name="title" id="title" onChange={callGoogleApiBooks} placeholder="At least 3 letters..." />
            <button>Search</button>
            <ul className="api-ul">
                {filterdBooks.map(book =>
                    <li key={book.id}>
                        {book.title}
                        <button onClick={() => addBook(book.id)}>+</button>
                    </li>
                )}
            </ul>
        </form>
    )
}
