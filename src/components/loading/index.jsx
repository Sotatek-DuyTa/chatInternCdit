import React, { Component } from 'react';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pastDelay } = this.props;
    console.log(this.props);

    return (
      <p> loading</p>
    );
  }
}

export default Loading;