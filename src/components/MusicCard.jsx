import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  addToFavorite = async ({ target }, music) => {
    const { checked } = target;
    this.setState({
      isLoading: true,
      isChecked: checked,
    });
    if (checked) {
      await addSong(music);
      this.setState({
        isLoading: false,
      });
    } else {
      await removeSong(music);
      const { onChangeFavs } = this.props;
      if (onChangeFavs) onChangeFavs(music.trackId);
      else {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  getFavorites = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteSongsReturned = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs: favoriteSongsReturned,
    }, () => {
      const { favoriteSongs } = this.state;
      const { music: { trackId } } = this.props;
      const validate = favoriteSongs.some((song) => (
        song.trackId === trackId
      ));
      if (validate) return this.setState({ isChecked: true });
    });
  }

  render() {
    const { music } = this.props;
    const { isLoading, isChecked } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div key={ music.trackId }>
        <h4>{music.trackName}</h4>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          Your browser does not support the element
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorite
          <input
            type="checkbox"
            name="favorite"
            id="favorite"
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ (event) => this.addToFavorite(event, music) }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  returnedAlbums: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;
