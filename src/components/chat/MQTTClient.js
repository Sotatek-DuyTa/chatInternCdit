import MQTT from 'paho-mqtt';

const mqttClientSetting = {
  hostname: process.env.mqtt_host || 'localhost',
  port: process.env.mqtt_port || 4000
}

var lwt = new MQTT.Message("payload");
lwt.destinationName = "topic";
lwt.qos = 0;
lwt.retained = false;

export default class MqttClientCustom {
  constructor(name, ctx) {
    this.name = name;
    this.ctx = ctx;

    this.init();

    this.queue = [];
  }

  setContext = ctx => {this.ctx = ctx};

  getClient = () => this.client;

  createRandom = () => Math.random(0, 1) * 100 + ''

  init() {
    this.client = new MQTT.Client(mqttClientSetting.hostname, mqttClientSetting.port, "/ws", this.createRandom());

    // set callback handlers
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.client.onMessageDelivered = this.onMessageDelivered;

    // connect the client
    this.client.connect({
      userName: 'alice',
      password: 'secret',
      // willMessage: lwt,
      reconnect: false,
      onSuccess: this.onConnect,
      onFailure: () => { console.log("has error") }
    });
  }

  // called when the client loses its connection
  onConnectionLost = (responseObject) => {
    console.log(responseObject);
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage);
    }
  }

  // called when a message arrives
  onMessageArrived = (message) => {
    console.log("onMessageArrived:" + message.payloadString);
    this.ctx.callBackMessageArriverd(message);
  }

  onMessageDelivered = (message) => {
    console.log("onMessageDelivered:" + message.payloadString);
  }

  // called when the client connects
  onConnect = () => {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");

    if (this.queue.length) {
      this.queue.forEach(todo => {
        switch (todo.action) {
          case 'sendMsg':
            this.sendMsg(todo.topic, todo.payload);
            break;
          case 'subscribe':
            this.subscribeTopic(todo.topic)
          default:
            return;
        }
      })
    }

    // window.axios.get('http://localhost:3000/all_user')
    // .then(data => {
    //   console.log(data.data);
    // })
    // this.client.subscribe("World");
    // let message = new MQTT.Message(this.name);
    // message.destinationName = "World";
    // this.client.send(message);
  }

  addActionToQueue = (actionObj) => {
    if (!this.client.isConnected()) {
      this.queue.push(actionObj);
      return false;
    }

    return true;
  }

  sendMsg = (topic, payload) => {
    let isConnected = this.addActionToQueue({
      action: 'sendMsg',
      topic,
      payload,
    })

    if (isConnected) {
      this.client.subscribe(topic);
      let message = new MQTT.Message(payload);
      message.destinationName = topic;
      this.client.send(message);
    }
  }

  subscribeTopic(topic) {
    let isConnected = this.addActionToQueue({
      action: 'subscribe',
      topic,
    })

    if (isConnected) {
      this.client.subscribe(topic);
    }
  }
}