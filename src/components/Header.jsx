import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.showUser();
  }

  showUser = async () => {
    const loggedUser = await getUser();
    this.setState({
      user: loggedUser.name,
      isLoading: false,
    });
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading ? <Loading />
          : <h2 data-testid="header-user-name">{ user }</h2>}
      </header>
    );
  }
}

export default Header;
