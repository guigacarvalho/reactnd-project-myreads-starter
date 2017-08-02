import React from 'react'
import BookList from './BookList.js'
import { Link } from 'react-router-dom'

class SearchComponent extends React.Component {

    render(){
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <form className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={this.props.query} onChange={this.props.search} />
                </form>
              </div>
              <div className="search-books-results">
                <BookList books={this.props.searchResults} 
                  onChange={(event, book) => {
                    this.props.onChange(event, book)
                    this.props.history.push('/')
                  }}
                />
              </div>
            </div>
        )
    }
}

export default SearchComponent
