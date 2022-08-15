import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <CssBaseline />
        <Container maxWidth="sm">
          <Switch>
            <Route exact path="/" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="*" component={ NotFound } />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
