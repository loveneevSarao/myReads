import React from 'react';
import ListOfBooks from './ListOfBooks';

class Shelves extends React.Component{

  render = () => {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="book-shelft-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books && this.props.books.filter((b) => {
                    return b.shelf === "currentlyReading"
                  }).map((book, key) => {
                    return <ListOfBooks key={key} updateBooks={this.props.updateBooks} data={book}/>
                  })}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="book-shelft-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books && this.props.books.filter((b) => {
                    return b.shelf === "wantToRead"
                  }).map((book) => {
                    return <ListOfBooks updateBooks={this.props.updateBooks} data={book}/>
                  })}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="book-shelft-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books && this.props.books.filter((b) => {
                    return b.shelf === "read"
                  }).map((book) => {
                    return <ListOfBooks updateBooks={this.props.updateBooks} data={book}/>
                  })}
                </ol>
              </div>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default Shelves;

