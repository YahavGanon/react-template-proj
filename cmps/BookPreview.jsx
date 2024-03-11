export function BookPreview({book}){
    // console.log(img);
    return <article className="book-preview">
        <img src={book.thumbnail} alt="" />
        <hr className="hr"></hr>
        <h2>{book.title.toUpperCase()} </h2>
        <h4>{`By:  ${book.authors}`}</h4>
    </article>
}