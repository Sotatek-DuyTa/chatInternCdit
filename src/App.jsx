import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { homeRoutes } from './Routes';
import initFirebase from './firebase';
import Auth from './components/authentication';
import * as firebase from 'firebase';
import Loading from './components/loading';
// import loadable from 'react-loadable';
// import Loading from './components/loading';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      loading: false,
    };
  }

  componentWillMount() {
    initFirebase();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isAuth: true,
          loading: true
        })
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
                        let renderComponent;
                        if (route.requireAuth && !isAuth) {
                          renderComponent = <Redirect to='/login' />
                        } else if (route.requireGuest ) {
                          renderComponent = <Redirect to='/' />
                        } else {
                          renderComponent = <route.component />
                        }

                        return renderComponent;
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