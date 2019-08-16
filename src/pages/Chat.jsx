import React, { Component } from 'react';
import MQTT from 'paho-mqtt';
import Sidebar from '../components/chat/Sidebar';
import { SidebarContextProvider } from '../components/chat/ChatContext';
import ChatScreen from '../components/chat/ChatScreen';
import '../style/Chat.sass';
import {
  withRouter
} from 'react-router-dom'

// const mqttClientSetting = {
//   hostname: process.env.mqtt_host || 'localhost',
//   port: process.env.mqtt_port || 4000
// }

class Chat extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   client: {}
    // }
  }

  componentDidMount() {
    if(!localStorage.getItem('userData')) {
      this.props.history.push('/login');
    }

    if(!localStorage.getItem('userProfile')) {
      this.props.history.push('/register');
    }
  }

  // componentDidMount() {
  //   this.client = new MQTT.Client(mqttClientSetting.hostname, mqttClientSetting.port, "/ws");
  //   // this.client = new MQTT.Client("iot.eclipse.org", Number(80), "/ws", "clientId");

  //   // console.log(this.client);
  //   // this.client.onConnectionLost = this.onConnectionLost();
  //   // this.client.onMessageArrived = this.onMessageArrived();
  //   var lwt = new MQTT.Message("payload");
  //   lwt.destinationName = "topic";
  //   lwt.qos = 0;
  //   lwt.retained = false;

  //   // set callback handlers
  //   this.client.onConnectionLost = onConnectionLost;
  //   this.client.onMessageArrived = onMessageArrived;

  //   // connect the this.client
  //   this.client.connect({
  //     userName: 'alice',
  //     password: 'secret',
  //     willMessage: lwt,
  //     reconnect: true,
  //     onSuccess: this.onConnect,
  //     onFailure: () => { console.log("has error") }
  //   });

  //   // called when the client loses its connection
  //   function onConnectionLost(responseObject) {
  //     if (responseObject.errorCode !== 0) {
  //       console.log("onConnectionLost:" + responseObject.errorMessage);
  //     }
  //   }

  //   // called when a message arrives
  //   function onMessageArrived(message) {
  //     console.log("onMessageArrived:" + message.payloadString);
  //   }
  // }

  // // called when the client connects
  // onConnect = () => {
  //   // Once a connection has been made, make a subscription and send a message.
  //   console.log("onConnect");
  //   this.client.subscribe("World");
  //   let message = new MQTT.Message("Hello");
  //   message.destinationName = "World";
  //   this.client.send(message);
  // }

  render() {

    return (
      <SidebarContextProvider>
        <div className="chat-page">
          <Sidebar />
          <ChatScreen />
        </div>
      </SidebarContextProvider>
    );
  }
}

export default withRouter(Chat);