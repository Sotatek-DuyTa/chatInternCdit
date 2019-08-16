import React, { Component } from 'react';
import { SidebarContextWrapper } from './ChatContext';
import MQTTClient from './MQTTClient';
var moment = require('moment');
window.moment = moment;


// let mqttClient = new MQTTClient;
// mqttClient.init();

// window.mqttClient = mqttClient;
// let mqttClient = new MQTTClient('Bee ' + Math.random(0, 1) * 10);
// console.log(mqttClient);
// console.log('hello chat screen');
// mqttClient.sendMsg('online', 'hello I\'m Bee ');
// // mqttClient.subscribeTopic('listonline');
// window.mqttClient = mqttClient;

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentConnectorMessage: []
    };

    this.message = React.createRef();
  }

  callBackMessageArriverd = async (message) => {
    const payload = JSON.parse(message.payloadString);

    // listOnline
    if (payload.topic === 'listOnline') {
      console.log('listOnline here', payload.listOnline);
      this.props.setListOnline(payload.listOnline);
    }

    // message
    if (payload.topic === 'message') {
      const newMessage = {
        uid: payload.uid,
        content: payload.content,
        timestamp: payload.timestamp
      }

      const currentConnectorMessage = this.state.currentConnectorMessage;
      currentConnectorMessage.push(newMessage);
      this.setState({ currentConnectorMessage });

    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.userData.uid === '' && nextProps.userData.uid) {
      if (!window.hasMqttClient) {
        let mqttClient = new MQTTClient(nextProps.userData.uid, this);
        window.mqttClient = mqttClient;
        window.hasMqttClient = true;
        mqttClient.subscribeTopic(`message/${nextProps.userData.uid}/#`); // listen all message
        mqttClient.subscribeTopic('listOnline'); // listen new user status (onl or off)
      }

      let message = {
        uid: nextProps.userData.uid,
        message: nextProps.userData.displayName
      }

      window.mqttClient.sendMsg('online', JSON.stringify(message));
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.currentConnector && (!this.props.currentConnector  || (this.props.currentConnector.uid !== nextProps.currentConnector.uid))) {
      console.log('-------------------');
      window.firebase.getAllMessage(nextProps.userData.uid).then(data => {
        const listMessage = _.map((data.val())[nextProps.currentConnector.uid] , (val, key) => ({ ...val, ...{ timestamp: key } }));
        // (data.val())[nextProps.currentConnector.uid];
        console.log('nextProps.currentConnector.uid', nextProps.currentConnector.uid);
        console.log('listMessage', data.val());
        this.setState({ 
          currentConnectorMessage: listMessage
        });
      })
    }
  }

  sendMsg = () => {
    this.mqttClient.sendMsg(this.topic.current.value, this.message.current.value);
  }

  enterToSendMessage = (event) => {
    if (event.key === 'Enter' && this.message.current.value.trim() !== "") {
      const { currentConnector, userData } = this.props;
      const messageContent = this.message.current.value;
      const message = {
        topic: 'message',
        uid: userData.uid,
        guessId: currentConnector.uid,
        content: messageContent,
        timestamp: moment().valueOf()
      }

      window.mqttClient.sendMsg(`message/${currentConnector.uid}/${currentConnector.guessId}/${message.timestamp}`, JSON.stringify(message));

      this.message.current.value = '';
    }
  }

  render() {
    const { allUser, currentConnector } = this.props;
    const { currentConnectorMessage } = this.state;

    console.log('chatscreen', this.props);

    return (
      <div className="chat-area">
        {
          currentConnector && allUser ? (
            <>
              <div className="chat-area__title">
                <p className="user__name">{`${currentConnector.displayName}(${currentConnector.name})`}</p>
                <div className="user__status">
                  <span className="status status--02"></span>
                  <span className="status-text"></span>
                </div>
              </div>

              {/* chatconent */}
              <div className="chat-area__content">
                {/* message list */}
                <div className="chat-area__message-list">
                  {
                    currentConnectorMessage.map((message, index) => (
                      <div className="chat-area__message-item" key={index}>
                        <div className="user__avatar">
                          <img src="http://unsplash.it/50/50" alt="dummy" className="user__avatar-img" />
                        </div>
                        <div className="message__content-wrapper">
                          <p className="user__name">{`${allUser[message.uid].name}(${allUser[message.uid].displayName})`}</p>
                          <p className="message__content">{message.content}</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* input text */}
              <div className="chat-area__input">
                <div className="chat-area__input-box">
                  <input type="text" placeholder="Message to " onKeyPress={this.enterToSendMessage} name="input-box" id="" ref={this.message} />
                </div>
              </div>
            </>
          ) : (
              <p>hello</p>
            )
        }
      </div>
    )
  }
}

export default SidebarContextWrapper(ChatScreen);