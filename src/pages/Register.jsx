import React, { Component } from 'react';
import Profile from '../components/register/Profile';
import AvatarProfile from '../components/register/AvatarProfile';
import '../style/Login.sass';
import '../style/Register.sass';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="login-page register-page">
        <div className="login__form">
          <h3 className="login__title">User Profile</h3>
          <AvatarProfile />
          <Profile />
        </div>
      </div>
    );
  }
}

export default Register;
