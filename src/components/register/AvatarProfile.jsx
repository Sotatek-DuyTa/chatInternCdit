import React, { Component, Forms } from 'react';
import * as firebase from 'firebase';
import Avatar from '../../../assets/images/blank-avatar.svg';

class AvatarProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: Avatar,
      avatarFile: null
    }
  }

  componentDidMount() {
    if (window.mainUserId) {
      window.firebase.getUserProfile(window.mainUserId).then(data => {
        console.log(data.val());
        if (data.val()) {
          this.setState({
            avatarUrl: data.val().avatar
          })
        }
      });
    }
  }
  handleFileChange = async (e) => {
    if (e.target.files[0]) {
      await this.setState({
        avatarFile: e.target.files[0]
      });
      const file = this.state.avatarFile;
      const mainUserId = window.mainUserId;
      const uploadTask = firebase.storage().ref(`avatars/${mainUserId}`).put(file);
      uploadTask.on('state_changed',
        (snapshot) => {

        },
        (error) => {
          console.log(error);
        },
        () => {
          firebase.storage().ref("avatars").child(mainUserId).getDownloadURL().then( url => {
            this.setState({avatarUrl: url});
            window.firebase.updateUserAvatar(url, window.mainUserId);
          })
        }
      );
      // window.firebase.pushAvatar(this.state.avatarFile, window.mainUserId);
    }
  }

  render() {
    return (
      <div className="register-avatar">
        <div className="avatar-wapper">
          <img className="avatar-image" src={this.state.avatarUrl || Avatar}/>
        </div>
        <form >
          <input className="avatar-input" type="file" onChange={this.handleFileChange}/>
        </form>
      </div>
    );
  }
}

export default AvatarProfile;
