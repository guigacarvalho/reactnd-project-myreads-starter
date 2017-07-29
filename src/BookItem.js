import React from 'react'

class BookItem extends React.Component {
    render(){
        const {book, onChange } = this.props
        const { shelf, imageLinks, title, authors } = book
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+imageLinks.smallThumbnail+')' }}></div>
                    <div className="book-shelf-changer">
                    <select defaultValue={shelf} onChange={(event) => onChange(event, book)}> 
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{Array.isArray(authors) ? authors.join(', ') : authors}</div>
            </div>
        )
    }
}

export default BookItem
