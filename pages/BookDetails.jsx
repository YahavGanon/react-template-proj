const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { AddReview } from "../cmps/AddReview.jsx"

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

    function getPageCount() {
        let pageCount = book.pageCount
        if (book.pageCount > 500) pageCount += ' - Hard'
        else if (book.pageCount > 200) pageCount += ' - Medium'
        else if (book.pageCount < 100) pageCount += ' - Easy'
        return pageCount
    }

    if (!book) return <div>Loading details...</div>
    return <section className="book-details">
        <h1 className="title">{book.title}</h1>
        <hr className="hr" />
        <h4>By: ${book.authors}</h4>
        <div>
            <span className="title">Price:</span>
            <span className={getBookPrice()}>{book.listPrice.amount}</span>
        </div>
        <div className="book-details-info-row">
            <span className="book-details-info-title">Pages:</span>
            <span className="book-details-info-text">{getPageCount()}</span>
        </div>
        <img className="img-size" src={book.thumbnail} alt="" />
        <p className="about-p"><span className="title">about: </span> {book.description}</p>
        <Link to="/book"><button>Return</button></Link>
        <Link to={`/book/edit/${book.id}`}><button>Edit Book</button></Link>
        <div className="flex justify-between">
            <AddReview bookId={book} />
            {book.review && <div>
                <h1>Reviews</h1>
                <hr />
                <div className="flex gap">
                {book.review.map((rev, index) => (
                    <div className="review" key={index}>
                        <h5>{`${rev.rating} ⭐`}</h5>
                        <h5>{rev.fullname}</h5>
                        <h5>{rev.date}</h5>
                    </div>
                ))}
                </div>
            </div>}

            {/* <button>Prev </button> */}
            {/* <button>Next </button> */}
        </div>
    </section>
}