import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      bandOrArtist: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.toGetMusics();
  }

  toGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    const filteredAlbum = album.filter((music) => music.trackName !== undefined);
    this.setState({
      albums: [...filteredAlbum],
      bandOrArtist: album[0].artistName,
      albumName: album[0].collectionName,
    });
  }

  render() {
    const { albums, bandOrArtist, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <h2 data-testid="artist-name">{ bandOrArtist}</h2>
        <h3 data-testid="album-name">{ albumName }</h3>
        <section>
          { albums.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
            />
          ))}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.number),
  }),
}.isRequired;

export default Album;
