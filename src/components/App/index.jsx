import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from '../Dashboard';
import Home from '../Home';
import paths from '../../common';


class App extends Component {
  state = { }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <BrowserRouter>
          <Switch>
            <Route exact path={paths.home} component={Home} />
            <Route path={paths.dashboard.base} component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
