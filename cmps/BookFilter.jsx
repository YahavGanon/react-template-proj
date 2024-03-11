import { bookService } from "../services/book.service.js"


const { useState } = React

export function BookFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(bookService.getDefaultFilter())
    console.log(filterByToEdit)
    function onFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        let { value, name, type } = target
        if (type === 'number') value = +value
        setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [name]: value }))

    }
    return <section className="book-filter">
        <form onSubmit={onFilter}>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" onChange={handleChange} value={filterByToEdit.title} placeholder="Search book..." />
            <label htmlFor="price">   Price</label>
            <input type="number"
                name="price"
                onChange={handleChange}
                id="price"
                value={filterByToEdit.price}
                placeholder="By Price" />
            <button>Search</button>
        </form>
    </section>
}