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
import UserProfile from './components/UserProfile/UserProfile';
import Home from './components/Home';
import postService from './services/posts';
import Register from './components/Register';
import DetailedPost from './components/DetailedPost/DetailedPost';

const App = () => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [errorMessage, setErrorMessage] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      const currentTime = new Date();

      // Require login after an hour
      if (currentTime - new Date(loggedInUser.lastLogin) >= 3600000) {
        localStorage.removeItem('loggedInUser');
      } else {
        const userCredentials = loggedInUser;
        postService.setToken(userCredentials.token);
      }
    }
  }, [loggedInUser]);

  useEffect(() => {
    document.title = 'Huynhstagram';
    const getAllPosts = async () => {
      const allPosts = await postService.getAllPosts();
      console.log('Posts:', allPosts);
      setPosts(allPosts);
    };

    getAllPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      console.log('Posts:', posts);
    }
  }, [posts]);

  const handleNewPost = (newPost) => {
    const newPosts = posts;
    newPosts.unshift(newPost);
    setPosts(newPosts);
  };

  const handleEditPost = (oldId, newPost) => {
    setPosts(posts.map((post) => (post.id === oldId ? newPost : post)));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

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
            component={DetailedPost}
            data={{
              posts,
              handleEditPost,
              handleDeletePost,
            }}
            path='/post/:id'
          />

          <PrivateRoute
            component={CreatePost}
            data={{
              handleNewPost,
            }}
            path='/post'
          />

          <PrivateRoute
            component={UserProfile}
            path='/user/:id'
          />

          <PrivateRoute
            component={Home}
            data={{
              posts,
              handleNewPost,
              handleEditPost,
              handleDeletePost,
            }}
            path='/'
          />
        </Switch>
      </Router>

      {/* <ReduxStuff /> */}

    </div>
  );
};

export default App;
