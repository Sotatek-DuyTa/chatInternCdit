import React, { Component } from 'react';
import * as firebase from 'firebase';
import { withRouter, Redirect } from 'react-router-dom';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      loading: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          auth: true,
          loading: true
        })

        this.props.auth = true;

        console.log(user);
      } else {
        this.setState({
          auth: false,
          loading: true
        })

        this.props.auth = false;
      }
    });
  }

  render() {
    const { auth, loading } = this.state;

    return (
      <div>
        {
          loading ? (
            <>
              {
                this.props.children
              }
            </>
          ) : (
              <p>loading ...</p>
            )
        }
      </div>
    );
  }
}

export default withRouter(Auth);