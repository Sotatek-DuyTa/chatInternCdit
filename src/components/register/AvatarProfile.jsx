import React, { Component, Forms } from 'react';
import Avatar from '../../../assets/images/blank-avatar.svg';

class AvatarProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: Avatar
    }
  }

  handleFileChange = (e) => {

  }

  render() {
    return (
      <div className="register-avatar">
        <div className="avatar-wapper">
          <img className="avatar-image" src={this.state.avatarUrl}/>
        </div>
        <form >
          <input className="avatar-input" type="file" onChange={this.handleFile}/>
        </form>
      </div>
    );
  }
}

export default AvatarProfile;
