
export function BookDetails({ book, idx, onGoBack }) {

    function getBookPrice() {
        if (book.listPrice.amount > 150) return 'expensive'
        else if (book.listPrice.amount < 60) return 'chip'
        else return ''

    }

    return <section className="book-details">
        <h1 className="title">{book.title}</h1>
        <hr className="hr" />
        <h4>By: ${book.authors}  <span className="title">Price:</span> <span className={getBookPrice()}>{book.listPrice.amount}</span></h4>
        <img className="img-size" src={book.thumbnail} alt="" />
        <p className="about-p"><span className="title">about: </span> {book.description}</p>
        <button onClick={onGoBack}>Return</button>

    </section>
}