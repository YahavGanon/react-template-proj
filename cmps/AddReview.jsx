const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
export function AddReview({ bookId }) {
    const [review, saveReview] = useState({ fullname: '', rating: '', date: '' })
    console.log('bookIdId', bookId)
    console.log(review)
    function onSaveReview(ev) {
        ev.preventDefault()
        console.log(ev)

        bookService.addReview(bookId, review)
            .then(savedBook => {
                console.log('savedbook', savedBook)
            })
            .catch(err => {
                console.log('Had issues saving book', err)
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break
            default:
                break

        }
        saveReview(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
    }
    const { fullname, rating, date } = saveReview
    return <section className="book-edit">
        <form onSubmit={onSaveReview} className="edit-form flex">
            <label htmlFor="fullname">Full Name:</label>
            <input type="text"
                id="fullname"
                placeholder="Your Name..."

                name="fullname"
                onChange={handleChange}
                value={fullname}
            />

            <label htmlFor="rating">Price:</label>
            <input type="number"
                id="rating"
                min={1}
                max={5}
                placeholder="Rate..."

                name="rating"
                onChange={handleChange}
                value={rating} />

            <label htmlFor="date">Date of Birth:</label>
            <input type="date" onChange={handleChange} id="date" value={date} name="date" />
            <button>Save Review</button>

        </form>
    </section>


}



{/* <label style="font-weight: 400;">Number of stars:<input type="number" min="1" value="1" fdprocessedid="f199fq" style="margin-left: 12px; max-width: 50px;"></label>

<input type="number" min="1" value="1" fdprocessedid="f199fq" style="margin-left: 12px; max-width: 50px;"></input> */}