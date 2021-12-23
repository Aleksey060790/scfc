import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainPage from './components/MainPage';
import { ThemeProvider } from '@material-ui/core';
import theme from './styles/theme';
import CardPage from './components/CardPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route path="/:background/:text/:icon/:user/:repository">
            <CardPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
