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
    BooksAPI.search(event.target.value).then((searchResults) => {
        this.setState((state) => 
          {
            if(searchResults && !searchResults.error) { // Fixing weird API issue (it returns 200 instead of 404's for empty response)
              const currentlibrary = state.books;
              const updatedSearchResults = searchResults.map((searchResultBook) => {
                const bookToUpdate = currentlibrary.filter((existingLibraryBook) => {
                      return searchResultBook.id === existingLibraryBook.id;
                  });
                return bookToUpdate[0] ? bookToUpdate[0] : searchResultBook;
              });
              return { searchResults: updatedSearchResults }
            } else {
              return { searchResults: [] }
            }
          });
    });
  }

  changeShelf = (event, book) => {
    const newShelf = event.target.value;
    BooksAPI.update(book, newShelf).then(() => {
      if(book.shelf !== 'none') { // Book already exists in one of our shelfs
        this.setState((state) => ({
          books: state.books.map((b)=> {
            if(b.id === book.id) 
              b.shelf = newShelf;
              return b;
          })
        }));
      } else { // Adding a new book to one of our shelfs
        book.shelf = newShelf;
        this.setState((state) => ({
          books: state.books.concat([book])
        }));
      }
    });
  }

  clearSearch = () => {
    this.setState({query: '', searchResults: []})
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/search' render={({history}) => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <form className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.search} />
                </form>
              </div>
              <div className="search-books-results">
                <BookList books={this.state.searchResults} 
                  onChange={(event, book) => {
                    this.changeShelf(event, book)
                    history.push('/')
                  }}
                />
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
                  <BookShelf title="Currently Reading" books={this.state.books.filter((b) => b.shelf === 'currentlyReading')} onChange={this.changeShelf}/>
                  <BookShelf title="Want to Read" books={this.state.books.filter((b) => b.shelf === 'wantToRead')} onChange={this.changeShelf}/>
                  <BookShelf title="Read" books={this.state.books.filter((b) => b.shelf === 'read')} onChange={this.changeShelf}/>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search" onClick={this.clearSearch}>Add a book</Link>
              </div>
            </div>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
