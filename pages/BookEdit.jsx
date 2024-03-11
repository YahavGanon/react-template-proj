const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter
import { bookService } from "../services/book.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()
    console.log('bookId', bookId)

    useEffect(() => {
      if(bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(book => setBookToEdit(book)
            ).catch(err => {
                console.log(`had issues loading book`, err)
                navigate('/book')
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
        setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(savedBook => {
                console.log('savedBook', savedBook)
                navigate('/book')
            })
            .catch(err => {
                console.log('Had issues saving book', err)
            })
    }

    console.log(bookToEdit)
    const { title, price } = bookToEdit
    return (
        <section className="book-edit">
            <form onSubmit={onSaveBook} className="edit-form flex">
                <label htmlFor="title">Title:</label>
                <input type="text"
                    id="title"
                    placeholder="Title of book..."

                    name="title"
                    onChange={handleChange}
                    value={title}
                />


                <label htmlFor="price">Price:</label>
                <input type="number"
                    id="price"
                    placeholder="Price..."

                    name="price"
                    onChange={handleChange}
                    value={price} />
                <button>Save</button>

            </form>
        </section>
    )
}