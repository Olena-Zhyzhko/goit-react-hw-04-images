import React, { Component } from 'react'
import './Searchbar.css'
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc'


export default class Searchbar extends Component {
    state = {
        searchImage: ''
    }

    handleChange = (e) => {
        this.setState({ 
            searchImage: e.currentTarget.value.toLowerCase()
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.searchImage.trim() === '') {
            return;
        }

        this.props.onSubmit(this.state.searchImage);
        this.setState({
            searchImage: '',
        })
    };

  render() {
    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={this.handleSubmit}>
                <button type="submit" className="SearchForm-button">
                    <FcSearch className='btnIcon' />
                <span className="SearchForm-button-label">Search</span>
                </button>

                <input
                className="SearchForm-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                name='searchImage'
                value={this.state.searchImage}
                onChange={this.handleChange}
                />
            </form>
        </header>
    )
  }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}