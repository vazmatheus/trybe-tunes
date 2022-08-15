import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
        <form>
          <TextField
            variant="standard"
            sx={ { my: 2, width: '100%' } }
            label="Artist"
            name="searchArtist"
            id="searchArtist"
            data-testid="search-artist-input"
            value={ searchArtist }
            onChange={ this.handleChange }

          />
          <Button
            variant="contained"
            data-testid="search-artist-button"
            disabled={ searchArtist.length < minSearchArtistLength }
            onClick={ this.searchAlbum }
          >
            Search
          </Button>
        </form>
        {isLoading && <Loading /> }
        {returnAlbums.length > 0 && (
          <p>{`Album results by: ${bandOrArtist}`}</p>
        )}
        {returnAlbums.map(({
          collectionId,
          artistName,
          collectionName,
          artworkUrl100,
        }) => (
          <Card sx={ { mb: 2 } } key={ collectionId }>
            <CardActionArea>
              <Link
                data-testid={ `link-to-album-${collectionId}` }
                to={ `/album/${collectionId}` }
              >
                <CardHeader
                  title={ collectionName }
                  subheader={ artistName }
                />
                <CardMedia
                  component="img"
                  image={ artworkUrl100 }
                  alt={ `art of ${collectionName}` }
                />
              </Link>
            </CardActionArea>
          </Card>
        ))}
        {searchFound && returnAlbums.length === 0 ? (
          <p>No albums were found</p>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Search;
