import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf.js'

class BooksApp extends React.Component {
  state = {
        books: []
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
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
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              {/* TODO: Implement search results behavior */}
              <div className="search-books-results">
                <ol className="books-grid"></ol>
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
