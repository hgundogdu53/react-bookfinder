import React, { Component } from 'react';
import './App.css';
import PrintType from './printtype/printtype';
import BookType from './booktype/booktype';
import BookList from './booklist/booklist';

// API Reference: 
// https://developers.google.com/books/docs/v1/reference/volumes/list

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      search: '',
      printType: '',
      bookType: ''
    };
    this.createURL = this.createURL.bind(this)
    this.bookFind = this.bookFind.bind(this)
  }

  setSearchInput = (input) => {
    this.setState({
      search: input
    });
  };

  createURL(search, printFilter, bookFilter) {
    const address = 'https://www.googleapis.com/books/v1/volumes?';
    const url = `${address}q=${search}&filter=${bookFilter || 'ebooks'}&printType=${printFilter || 'all'}`;
    console.log(url);
    return url;
  };

  bookFind(event) {
    event.preventDefault()
    event.stopPropagation()
    const url = this.createURL(
      this.state.search,
      this.state.printType,
      this.state.bookType
    );
    const options = {
      method: 'GET',
      key: 'AIzaSyDuEyxSC02DMX0JlArHYN7NNKxI9K2Cbtk',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(response => response.json())
      .then(data => {
        data.items.map(items => {
          const book = {
            title: items.volumeInfo.title,
            author: items.volumeInfo.authors,
            image: items.volumeInfo.imageLinks.smallThumbnail,
            price: items.saleInfo.saleability,
            description: items.volumeInfo.description
          };
          this.setState({
            books: [...this.state.books, book]
          });
          return book;
        })
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  };
  bookTypeFilter = (filter) => {
    this.setState({ bookType: filter });
  };

  printTypeFilter = (filter) => {
    this.setState({ printType: filter });
  };

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>Book Finder</h1>
        </header>
        <div className='search-box'>
          <form>
            <label htmlFor='search'>Search:</label>
            <input
              type='text'
              name='this.state.search'
              onChange={event => this.setSearchInput(event.target.value)}
            />
            <button onClick={this.bookFind}>
              Search
            </button>
          </form>
        </div>
        <div className='all-type'>
          <PrintType printFilter={filter => this.printTypeFilter(filter)} />
          <BookType bookFilter={filter => this.bookTypeFilter(filter)} />
        </div>
        <div className='book-list'>
          <BookList books={this.state.books} />
        </div>
      </div>
    )
  }
}

export default App;