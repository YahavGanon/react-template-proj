import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { demoBooks } from '../books.js'

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
    return storageService.post(BOOK_KEY, book)
}

function getDefaultFilter() {
    return { title: '', price: 0 }
}

function getEmptyBook(title = '', movies = ['Rambo', 'Rocky'], img = './assets/img/green.png') {
    return { id: '', title, movies, img }
}

function _createBook(title, movies, img) {
    const book = getEmptybook(title, movies, img)
    book.id = utilService.makeId()
    return book
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = demoBooks

        utilService.saveToStorage(BOOK_KEY, books)
    }
}