import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

const minSearchArtistLength = 2;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchArtist: '',
      isLoading: false,
      returnAlbums: [],
      bandOrArtist: '',
      searchFound: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  searchAlbum = async () => {
    const { searchArtist } = this.state;
    this.setState({ isLoading: true });
    const albums = await searchAlbumsAPI(searchArtist);
    this.setState((prevState) => ({
      isLoading: false,
      searchArtist: '',
      returnAlbums: [...albums],
      bandOrArtist: prevState.searchArtist,
      searchFound: true,
    }));
  };

  render() {
    const {
      searchArtist,
      bandOrArtist,
      returnAlbums,
      isLoading,
      searchFound,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchArtist">
            Artista
            <input
              type="text"
              name="searchArtist"
              id="searchArtist"
              data-testid="search-artist-input"
              value={ searchArtist }
              onChange={ this.handleChange }

            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchArtist.length < minSearchArtistLength }
            onClick={ this.searchAlbum }
          >
            Pesquisar
          </button>
        </form>
        {isLoading && <Loading /> }
        {returnAlbums.length > 0 && (
          <p>{`Resultado de álbuns de: ${bandOrArtist}`}</p>
        )}
        {returnAlbums.map(({
          collectionId,
          artistName,
          collectionName,
        }) => (
          <li key={ collectionId }>
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
            >
              <p>{artistName}</p>
              <p>{collectionName}</p>
            </Link>
          </li>
        ))}
        {searchFound && returnAlbums.length === 0 ? (
          <p>Nenhum álbum foi encontrado</p>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Search;
