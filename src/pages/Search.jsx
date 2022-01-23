import React, { Component } from 'react';
import Header from '../components/Header';

const inputArtistLength = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputArtist: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { inputArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="inputArtist">
            Artista
            <input
              type="text"
              name="inputArtist"
              id="inputArtist"
              data-testid="search-artist-input"
              value={ inputArtist }
              onChange={ this.handleChange }

            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ inputArtist.length < inputArtistLength }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
