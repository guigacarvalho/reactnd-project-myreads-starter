import React from 'react'
import BookList from './BookList.js'

class BookShelf extends React.Component {
    render(){
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
                <BookList books={this.props.books}/>
            </div>
            </div>
        )
    }
}

export default BookShelf