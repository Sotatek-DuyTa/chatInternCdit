import React, { Component, Forms } from 'react';
import * as firebase from 'firebase';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class Profile extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      dOB: "",
      avatar: "",
      role: "",
      gender: "male"
    }
  }

  handleChangeFullname = (e) => {
    this.setState({fullName: e.target.value});
  }
  handleChangeEmail = (e) => {
    this.setState({email: e.target.value});
  }
  handleChangeDob = (e) => {
    this.setState({dOB: e.target.value});
  }
  handleChangeRole = (e) => {
    this.setState({role: e.target.value});
  }
  handleChangeGender = (e) => {
    this.setState({gender: e.target.value});
  }
  handleSubmit = (event) => {
    firebase.database().ref('users/').push({
      fullName: this.state.fullName,
      email: this.state.email,
      dOB: this.state.dOB,
      avatar: this.state.avatar,
      role: this.state.role,
      gender: this.state.gender
    })
  }

  render() {
    return (
      <div className="login--normal">
        <div className="user-profile">
          <form onSubmit={this.handleSubmit()}>
            <div className="user-profile__fullname theme__input-item">
              <div className="theme-label--primary"> Full Name</div>
              <input 
                type="text" 
                name="fullname" 
                className="theme-input--primary"
                value={this.state.fullName} 
                onChange={this.handleChangeFullname}/>
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
            <div className="user-profile__role theme__input-item">
              <div className="theme-label--primary">Role</div>
              <input
                type="text" 
                name="role"
                className="theme-input--primary"
                value={this.state.role} 
                onChange={this.handleChangeRole}/>
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
