import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'
import BookList from './BookList.js'

class BooksApp extends React.Component {
  state = {
        books: [],
        searchResults: [],
        query: ''
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  search = (event) => {
    this.setState({query: event.target.value})
    BooksAPI.search(event.target.value).then((books) => {
      this.setState({searchResults: books})
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/search' render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <form className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.search} />
                </form>
              </div>
              <div className="search-books-results">
                <BookList books={this.state.searchResults}/>
              </div>
            </div>
          )} />  
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf title="Currently Reading" books={this.state.books.filter((b) => b.shelf === 'currentlyReading')}/>
                  <BookShelf title="Want to Read" books={this.state.books.filter((b) => b.shelf === 'wantToRead')}/>
                  <BookShelf title="Read" books={this.state.books.filter((b) => b.shelf === 'read')}/>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
