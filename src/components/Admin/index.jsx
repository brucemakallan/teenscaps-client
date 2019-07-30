import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './loginForm';
import login from '../../redux/actions/admin';
import paths, { endpoints } from '../../common';

export class Admin extends Component {
  state = {
    admin: {
      email: '',
      password: '',
    },
  }

  handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const { admin } = this.state;
    this.setState({
      admin: {
        ...admin,
        [name]: value,
      }
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { admin } = this.state;
    const { loginAction, history } = this.props;
    loginAction(endpoints().adminLogin, admin, history);
  }

  handleLogout = () => {
    const { history } = this.props;
    localStorage.removeItem('teenscaps-email');
    localStorage.removeItem('teenscaps-token');
    history.push(paths.dashboard.sections);
  }

  render() {
    const email = localStorage.getItem('teenscaps-email');
    return (
      <LoginForm
        email={email}
        onChange={this.handleOnChange}
        onSubmit={this.handleOnSubmit}
        logout={this.handleLogout}
      />
    );
  }
}

Admin.propTypes = {
  loginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  loginAction: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
