import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { demoBooks } from '../books.js'
console.log(demoBooks)

const BOOK_KEY = 'book_DB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    _createBook,
    getDefaultFilter,
    addReview,
    addGoogleBook,
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }
            return books
        })
}


function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        book = _createBook(book.title, book.price)
        return storageService.post(BOOK_KEY, book)
    }
}

function getDefaultFilter() {
    return { title: '', price: 0 }
}

function getEmptyBook(title = '', price = '') {
    return { title, price, }
}

function _createBook(title, price) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    book.thumbnail = 'https://www.philippagregory.com/storage//book-covers/mmb63UuhKnv9BK4oid3PASu9GUuTLnjGiwErCILy.jpg'
    book.authors = ['yahav ganon', 'someone else']
    book.description = utilService.makeLorem(10)
    return book
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = demoBooks

        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function addReview(book, review) {
    book.review = book.review || []
    book.review.push(review)
    return storageService.put(BOOK_KEY, book)
}

function addGoogleBook(googleBook) {
    const thumbnail = googleBook.volumeInfo.imageLinks && googleBook.volumeInfo.imageLinks.thumbnail
    const newBook = {
        id: googleBook.id,
        title: googleBook.volumeInfo.title,
        subtitle: googleBook.volumeInfo.subtitle,
        isOnSale: googleBook.saleInfo.isEbook,
        publishedDate: 2019,
        pageCount: googleBook.volumeInfo.pageCount,
        currencyCode: googleBook.volumeInfo.language,
        thumbnail: thumbnail || "https://booksondemand.ma/cdn/shop/products/RichDad_PoorDadbyRobertT.Kiyosaki-books.jpg?v=1609441318",
        authors: googleBook.volumeInfo.authors,
        listPrice: {
            amount: 109,
        },
        description: googleBook.volumeInfo.description,
    }
    console.log(newBook)
    return storageService.post(BOOK_KEY, newBook)
}





