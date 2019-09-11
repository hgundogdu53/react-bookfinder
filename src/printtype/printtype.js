import React, { Component } from 'react';

class PrintType extends Component {
    render() {
        return (
            <div className='App'>
                <select
                    onChange={event => this.props.printFilter(event.target.value)}
                    name='printtype'
                >
                    <option value='all'>All</option>
                    <option value='books'>Books</option>
                    <option value='magazines'>Magazines</option>
                </select>
            </div>
        );
    }
}

export default PrintType;