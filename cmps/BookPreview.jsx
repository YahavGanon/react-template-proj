export function BookPreview({book,idx}){
    // console.log(img);
    return <article className="book-preview">
        <img src={`../assets/img/${idx + 1}.jpg`} alt="" />
        <hr className="hr"></hr>
        <h2>{book.title.toUpperCase()} </h2>
        <h4>{`By:  ${book.authors}`}</h4>
    </article>
}