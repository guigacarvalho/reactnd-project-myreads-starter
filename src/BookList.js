import React from 'react'
import BookItem from './BookItem.js'

class BookList extends React.Component {
    render(){
        return (
            <ol className="books-grid">
                {
                    Array.isArray(this.props.books) ? this.props.books.map((book, index) => (
                        <li key={book.id}>
                            <BookItem book={book} onChange={this.props.onChange}/>
                        </li>
                    )) : ''
                }
            </ol>

        )
    }
}

export default BookList