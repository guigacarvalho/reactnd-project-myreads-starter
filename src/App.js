import React from 'react'
import { BrowserRouter, Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import HomepageComponent from './HomepageComponent.js'
import SearchComponent from './SearchComponent.js'
import './App.css'

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
          <Route exact path='/' render={() => (
            <HomepageComponent
            books={this.state.books}
            onChange={this.changeShelf}
            clearSearch={this.clearSearch}
            />
          )}/>
          <Route exact path='/search' render={({history}) => (
            <SearchComponent
            query={this.state.query}
            searchResults={this.state.searchResults}
            search={this.search}
            history={history}
            onChange={this.changeShelf}
            />
          )} />  
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
