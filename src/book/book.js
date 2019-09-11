import React, { Component } from 'react';

class Book extends Component {
    render() {
        return (
            <li>
                <img src={this.props.books.image} alt='main_image' />
                <h2>{this.props.books.title}</h2>
                <h3>{this.props.books.author}</h3>
                <h2>{this.props.books.description}</h2>
            </li>
        );
    }
}

export default Book;