import React, { Component } from 'react';
import { SidebarContextWrapper } from './ChatContext';

// Sidebar.contextType = ChatContext;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSetting: false,
      channels: []
    };
  }

  toggleSetting = () => {
    console.log('toggle setting');
    this.setState(prevState => ({ isShowSetting: !prevState.isShowSetting }))
  }

  render() {
    const { channels, friends, userData, updateCurrentConnector, listOnline } = this.props;

    console.log('sidebar' , this.props);

    return (
      <div className="sidebar-01">

        {/* profile */}
        <div className="sidebar__profile" onClick={this.toggleSetting}>
          <div className="profile-content">
            <div className="profile__information">

              {/* avatar */}
              <div className="profile__avatar">
                <img src="http://unsplash.it/300/300" alt={userData.name} />
              </div>

              {/* name */}
              <div className="profile__name-wrapper-02">
                <p className="profile__display-name-02"> {userData.displayName} </p>
                <p className="profile__name"> {userData.name} </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar__chat-connection"></div>
        {/* channel */}
        <div className="sidebar__channel">
          <p className="sidebar__channel-title">Channels</p>
          <div className="sidebar__channel-group">
            {
              channels.map((channel, index) => (
                <div className="sidebar__channel-item" key={index}>
                  <p className="name">{channel.name}</p>
                </div>
              ))
            }
          </div>
        </div>

        {/* friend */}
        <div className="sidebar__channel">
          <p className="sidebar__channel-title">Direct Messages</p>
          <div className="sidebar__channel-group">
            {
              friends.map((friend, index) => (
                <div className="sidebar__channel-item notify" key={index} onClick={ () => {updateCurrentConnector(friend)} }>
                  <span className={`status ${ _.indexOf(listOnline, friend.uid) !== -1 ? 'online' : '' }`}></span>
                  <p className="name">{friend.name}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}


export default SidebarContextWrapper(Sidebar);