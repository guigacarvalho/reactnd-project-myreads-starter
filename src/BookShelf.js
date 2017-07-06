import React from 'react'
import BookItem from './BookItem.js'

class BookShelf extends React.Component {
    render(){
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        this.props.books.map((book, index) => (
                            <li key={index}>
                                <BookItem book={book}/>
                            </li>
                        ))
                    }
                </ol>
            </div>
            </div>
        )
    }
}

export default BookShelf