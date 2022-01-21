import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const inputNameLength = 3;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      isLoading: false,
      isRedirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateLogin = async () => {
    const { inputName } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: inputName });
    this.setState({ isLoading: false, isRedirect: true });
  };

  render() {
    const { inputName, isLoading, isRedirect } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <form data-testid="page-login">
        <label htmlFor="inputName">
          Nome
          <input
            type="text"
            id="inputName"
            name="inputName"
            value={ inputName }
            onChange={ this.handleChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="submit"
          disabled={ inputName.length < inputNameLength }
          onClick={ this.validateLogin }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
        {isRedirect && <Redirect to="/search" />}
      </form>
    );
  }
}

export default Login;
