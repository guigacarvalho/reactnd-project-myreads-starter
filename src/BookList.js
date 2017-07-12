import React from 'react'
import BookItem from './BookItem.js'

class BookList extends React.Component {
    render(){
        return (
            <ol className="books-grid">
                {
                    this.props.books.length ? this.props.books.map((book, index) => (
                        <li key={index}>
                            <BookItem book={book}/>
                        </li>
                    )) : ''
                }
            </ol>

        )
    }
}

export default BookList