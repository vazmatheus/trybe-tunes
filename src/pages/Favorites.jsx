import React, { Component } from 'react';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({
      isLoading: true,
    });
    const favoriteSongsReturned = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteSongs: favoriteSongsReturned,
    });
  }

  onChangeFavs = (id) => {
    const { favoriteSongs } = this.state;
    this.setState({
      favoriteSongs: favoriteSongs.filter((music) => music.trackId !== id),
    });
  }

  render() {
    const { favoriteSongs, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        { favoriteSongs.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
            onChangeFavs={ this.onChangeFavs }
          />
        )) }
      </div>
    );
  }
}

export default Favorites;
