import React, { Component, Forms } from 'react';
import * as firebase from 'firebase';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      displayName: "",
      name: "",
      email: "",
      dOB: "",
      avatar: "",
      gender: "male"
    }
  }

  componentDidMount() {
    if (window.mainUserId) {
      window.firebase.getUserProfile(window.mainUserId).then(data => {
        console.log(data.val());
        if (data.val()) {
          this.setState({
            uid: window.mainUserId,
            displayName: data.val().displayName || '',
            name: data.val().name || '',
            email: data.val().email || '',
            dOB: data.val().dOB || '',
            gender: data.val().gender || ''
          })
        }
      });
    }
  }

  handleChangeName = (e) => {
    this.setState({name: e.target.value});
  }
  handleChangeEmail = (e) => {
    this.setState({email: e.target.value});
  }
  handleChangeDob = (e) => {
    this.setState({dOB: e.target.value});
  }
  handleChangeDisplayName = (e) => {
    this.setState({displayName: e.target.value});
  }
  handleChangeGender = (e) => {
    this.setState({gender: e.target.value});
  }
  handleSubmit = (event) => {
    event.preventDefault();
    window.firebase.createUserProfile(this.state);

    localStorage.setItem('userProfile', 'true');
  }

  render() {
    return (
      <div className="login--normal">
        <div className="user-profile">
          <form onSubmit={e => {this.handleSubmit(e)}}>
            <div className="user-profile__fullname theme__input-item">
              <div className="theme-label--primary"> Full Name</div>
              <input 
                type="text" 
                name="fullname" 
                className="theme-input--primary"
                value={this.state.name} 
                onChange={this.handleChangeFullname}/>
              <div className="theme__input-border"></div>
            </div>
            <div className="user-profile__display-name theme__input-item">
              <div className="theme-label--primary">Display Name</div>
              <input
                type="text" 
                name="displayname"
                className="theme-input--primary"
                value={this.state.displayName} 
                onChange={this.handleChangeDisplayName}/>
              <div className="theme__input-border"></div>
            </div>
            <div className="user-profile__email theme__input-item">
              <div className="theme-label--primary">Email</div>
              <input 
                type="text" 
                name="email" 
                className="theme-input--primary"
                value={this.state.email} 
                onChange={this.handleChangeEmail}/>
              <div className="theme__input-border"></div>
            </div>
            <div className="user-profile__dob theme__input-item">
              <div className="theme-label--primary">Date of Birth</div>
              <input 
                type="text" 
                name="dob" 
                className="theme-input--primary"
                value={this.state.dOB} 
                onChange={this.handleChangeDob}/>
              <div className="theme__input-border"></div>
            </div>
            <div className="user-profile__gender theme__input-item">
              <div className="theme-label--primary">Gender</div>
              <select
                type="text" 
                name="gender"
                className="theme-input--primary"
                value={this.state.gender} 
                onChange={this.handleChangeGender}>
                  <option value="male"> Male </option>
                  <option value="female"> Female </option>
                  <option value="other"> Other </option>
              </select>
              <div className="theme__input-border"></div>
            </div>
            <input className="theme__submit" type="submit" value="Submit"/>
          </form>
        </div>
      </div>
    )
  }
}

export default Profile;
