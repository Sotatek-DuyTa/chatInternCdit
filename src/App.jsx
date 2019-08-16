import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { homeRoutes } from './Routes';
import BeeFirebase from './firebase';
import Auth from './components/authentication';
import * as firebase from 'firebase';
import Loading from './components/loading';
const _ = require('lodash');

// import loadable from 'react-loadable';
// import Loading from './components/loading';

window.firebase = new BeeFirebase;
window.firebase.initApp();
window._ = _;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      loading: false,
    };
  }

  componentDidMount() {
    window.firebase.getFirebase().auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isAuth: true,
          loading: true
        })

        console.log(user.email);

        console.log( window.firebase.getUserId());
      } else {
        this.setState({
          isAuth: false,
          loading: true
        })
      }
    });
  }

  render() {
    const { loading, isAuth } = this.state;

    return (
      <div className="App">
        {
          loading ? (
            <>
              <Link to='/login'>login</Link>
              <Link to='/'>Home</Link>
              <Link to='/asdsad'>Not Found</Link>
              <Switch>
                {
                  homeRoutes.map((route, i) => (
                    <Route
                      key={i}
                      exact={route.exact}
                      path={route.path}
                      render={props => {
                        // if (route.requireAuth && !isAuth) {
                        //   console.log('1');
                        //   return <Redirect to='/login' />
                        // }
                        
                        // if (route.requireGuest ) {
                        //   console.log('2');
                        //   return <Redirect to='/' />
                        // }
                        // console.log('3');

                        return <route.component />
                      }}
                    />
                  ))
                }
              </Switch>
            </>
          ) : (
              <Loading />
            )
        }
      </div>
    );
  }
}

export default App;