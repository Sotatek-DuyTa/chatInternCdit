import React, { Component } from 'react';
import * as firebase from 'firebase';
import Profile from '../components/register/Profile';
import AvatarProfile from '../components/register/AvatarProfile';
import '../style/Login.sass';
import '../style/Register.sass';

class Register extends Component {
  constructor(props) {
    super(props);
    let fullName,dOB, avatar, role, gender;
    this.state = {
      fullName: fullName,
      dOB: dOB,
      avatar: avatar,
      role: role,
      gender: gender
    };
  }

  render() {
    return (
      <div className="login-page register-page">
        <div className="login__form">
          <h3 className="login__title">Register</h3>
          <AvatarProfile />
          <Profile />
        </div>
      </div>
    );
  }
}

export default Register;
