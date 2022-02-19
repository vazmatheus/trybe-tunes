import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
    };
  }

  addToFavorite = async ({ target }, music) => {
    const { checked } = target;
    this.setState({
      isLoading: true,
      isChecked: checked,
    });
    if (checked) {
      await addSong(music);
    }
    this.setState({
      isLoading: false,
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
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
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
