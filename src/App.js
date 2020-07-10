import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './Home.scss';
import NavMenu from './components/NavMenu';
import Login from './components/Login';
import Notification from './components/Notification';
import CreatePost from './components/CreatePostCard';
// import ReduxStuff from './components/ReduxStuff';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import postService from './services/posts';
import Register from './components/Register';

const App = () => {
  // const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const loggedInUser = window.localStorage.getItem('loggedInUser');

  useEffect(() => {
    if (loggedInUser) {
      const userCredentials = JSON.parse(loggedInUser);
      // setUser(userCredentials);
      postService.setToken(userCredentials.token);
    }
  }, [loggedInUser]);

  useEffect(() => {
    document.title = 'Huynhstagram';
  }, []);

  return (
    <div>
      <Router>
        <NavMenu />
        <Notification message={errorMessage} />
        <Switch>
          <PublicRoute
            component={Login}
            data={{
              setErrorMessage,
            }}
            path='/login'
          />

          <PublicRoute
            component={Register}
            data={{
              setErrorMessage,
            }}
            path='/register'
          />

          <PrivateRoute
            component={CreatePost}
            path='/post'
          />

          <PrivateRoute
            component={UserProfile}
            path='/user'
          />

          <PrivateRoute
            component={Home}
            path='/'
          />
        </Switch>
      </Router>

      {/* <ReduxStuff /> */}

    </div>
  );
};

export default App;
