import * as React from 'react';
import { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Loading from './Loading';

class ResponsiveAppBar extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.showLoading();
  }

  showLoading = async () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={ {
                mr: 2,
                display: 'flex',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              } }
            >
              TrybeTunes
            </Typography>
            <Box sx={ { flexGrow: 1, display: 'flex' } }>
              <Button
                sx={ { my: 2, color: 'white', display: 'block' } }
                component={ RouterLink }
                to="/"
              >
                Search
              </Button>
              <Button
                sx={ { my: 2, color: 'white', display: 'block' } }
                component={ RouterLink }
                to="/favorites"
              >
                Favorites
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}

export default ResponsiveAppBar;
