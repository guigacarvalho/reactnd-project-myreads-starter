import React from 'react'
import BookShelf from './BookShelf.js'
import { Link } from 'react-router-dom'

class HomepageComponent extends React.Component {

    render(){
        return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf title="Currently Reading" books={this.props.books.filter((b) => b.shelf === 'currentlyReading')} onChange={this.props.onChange}/>
                  <BookShelf title="Want to Read" books={this.props.books.filter((b) => b.shelf === 'wantToRead')} onChange={this.props.onChange}/>
                  <BookShelf title="Read" books={this.props.books.filter((b) => b.shelf === 'read')} onChange={this.props.onChange}/>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" onClick={this.props.clearSearch}>Add a book</Link>
              </div>
            </div>
        )
    }
}

export default HomepageComponent
