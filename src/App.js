import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './Shelves'
import ListOfBooks from './ListOfBooks';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
    query: "",
    error: "",
    results: [],
    showSearchPage: false,
  }

  findBooks = (query) => {
    this.setState({
      query
    })
    if(query === ""){
      (this.setState({results: []}))
    } else {
      BooksAPI.search(query).then(data => {
        if(data instanceof Array){
          this.setState({results: data})
        } else {
          this.setState({results: []})
        }
      })
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  updateBooks = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(booksData => {
        this.setState({books: booksData})
      })
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e) => this.findBooks(e.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.results && this.state.results.map((results, key) => {
                  return <ListOfBooks key={key} updateBooks={this.updateBooks} data={results}/>
                })}
              </ol>
            </div>
          </div>
        ) : (
          <>
            <Route exact path="/" render={() => (
              <div>
                <Shelves books={this.state.books} updateBooks={this.updateBooks}/>
              <div className="open-search">
                <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
              </div>
              </div>
            )}/>
          </>
        )}
      </div>
    )
  }
}

export default BooksApp;

