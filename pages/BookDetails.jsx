const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

export function BookDetails() {
    const [book, setBook] = useState(null)
    console.log('book:', book)
    const params = useParams()
    const navigate = useNavigate()
    console.log(params)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => {
                navigate('/book')
                console.log('had issues', err)
            })
    }

    function getBookPrice() {
        if (book.listPrice.amount > 150) return 'expensive'
        else if (book.listPrice.amount < 60) return 'chip'
        else return ''
    }

    if (!book) return <div>Loading details...</div>
    return <section className="book-details">
        <h1 className="title">{book.title}</h1>
        <hr className="hr" />
        <h4>By: ${book.authors}  <span className="title">Price:</span> <span className={getBookPrice()}>{book.listPrice.amount}</span></h4>
        <img className="img-size" src={book.thumbnail} alt="" />
        <p className="about-p"><span className="title">about: </span> {book.description}</p>
        <Link to="/book"><button>Return</button></Link>
        <Link to={`/book/edit/${book.id}`}><button>Edit Book</button></Link>
        <div className="flex justify-between">
            {/* <button>Prev </button> */}
            {/* <button>Next </button> */}
        </div>
    </section>
}