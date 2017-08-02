import React from 'react'
import BookItem from './BookItem.js'

const BookList = ({books, onChange}) => (
    <ol className="books-grid">
        {
            Array.isArray(books) ? books.map((book) => (
                <li key={book.id + book.shelf}>
                    <BookItem book={book} onChange={onChange}/>
                </li>
            )) : ''
        }
    </ol>
)

export default BookList