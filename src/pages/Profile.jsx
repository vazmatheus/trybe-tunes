import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.showUser(user);
  }

  showUser = (object) => {
    this.setState({
      user: { ...object },
      isLoading: false,
    });
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.description}</p>
            <img src={ user.image } data-testid="profile-image" alt="Imagem do usuário" />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
