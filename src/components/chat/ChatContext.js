import React, { Component } from 'react';
import rf from '../../common/request/RequestFactory';
var _ = require('lodash');
// import MQTT from 'paho-mqtt';

const SidebarContext = React.createContext();

export class SidebarContextProvider extends Component {
  state = {
    channels: [],
    allUser: null,
    friends: [],
    userData: {
      name: '',
      display: '',
      uid: ''
    },
    currentConnector: null,
    listOnline: [],
  }

  setListOnline = listOnline => {
    this.setState({ listOnline });
  }

  addChannels = channel => {
    this.props.setChannels(prevState => {
      let channels = prevState.channels;
      channels.push(channel);
      return { channels };
    })
  }

  updateCurrentConnector = (connector) => {
    this.setState({ currentConnector: connector })
  }

  async componentDidMount() {
    await window.firebase.getUserData().then(data => {
      console.log('userData', data)
      this.setState({
        userData: data,
        channels: data.channels || []
      })
    });

    console.log('userData' , this.state.userData);

    window.firebase.getAllUser().then(data => {
      console.log('channels', data.val());
      let dataTransformed = _.map(data.val(), (val, key) => ({ ...val, ...{ uid: key } }));
      _.remove(dataTransformed, item => item.uid === this.state.userData.uid) // remove main
      console.log('dataTransformed', dataTransformed);

      this.setState({
        allUser: data.val(),
        friends: dataTransformed
      })
    });
  }

  render() {
    const {
      updateCurrentConnector,
      setListOnline,
    } = this;
    const data = { ...this.state, ...{ updateCurrentConnector, setListOnline } }

    return (
      <SidebarContext.Provider value={data}>
        {this.props.children}
      </SidebarContext.Provider>
    );
  }
}

export function SidebarContextWrapper(Component) {
  return (
    class _ extends Component {
      render() {
        return (
          <SidebarContext.Consumer>
            {
              context => <Component {...context} {...this.props} />
            }
          </SidebarContext.Consumer>
        );
      }
    }
  );
}

