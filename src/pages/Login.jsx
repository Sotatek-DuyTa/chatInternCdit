import React, { Component } from 'react';
import PhoneLogin from '../components/login/PhoneLogin';
import SocialList from '../components/login/SocialList';
import Heart from '../../assets/images/heart.svg';
import '../style/Login.sass';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="login-page">
        <div className="login__form">
          <h3 className="login__title">Login</h3>
          <PhoneLogin />

          <div className="login--social">
            <span className="login-social__title">Or Sign In Using</span>
            <ul className="login-social__list">
              {
                SocialList.map((SocialLogin, index) => (
                  <SocialLogin key={index} />
                ))
              }
            </ul>
          </div>

          <p className="copyright">
            <span className="copyright__text">Made By Passion</span>
            <img src={Heart} className="heart" alt="" />
          </p>
        </div>
      </div>
    );
  }
}

export default Login;