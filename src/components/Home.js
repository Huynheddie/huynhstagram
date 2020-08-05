import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import Posts from './Posts';
import userService from '../services/user';
import postService from '../services/posts';
import SuggestedUsers from './SuggestedUsers';

const Home = () => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      let response = await userService.getAllUsers();
      console.log('Users:', response);
      setUsers(response);
      response = await userService.getUser(loggedInUser.id);
      setCurrentUser(response);
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const getAllPosts = async () => {
        const allPosts = await postService.getAllPosts();
        console.log(currentUser);
        setPosts(allPosts
          .filter((post) => post.user.id === currentUser.id || currentUser.following.findIndex((person) => person.id === post.user.id) !== -1));
      };
      getAllPosts();
    }
  }, [currentUser]);

  useEffect(() => {
    if (posts.length > 0) {
      console.log('Posts:', posts);
    }
  }, [posts]);

  const handleEditPost = (oldId, newPost) => {
    setPosts(posts.map((post) => (post.id === oldId ? newPost : post)));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <Grid columns='2' centered>
      <Grid.Row>
        <Grid.Column width='8'>
          { posts.length === 0 && currentUser
            && (
            <div style={{ height: '300px', width: '300px', backgroundColor: 'red' }}>
              hi world
            </div>
            )}
          <Posts
            posts={posts}
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
          />
        </Grid.Column>
        <Grid.Column width='2' />
        { users.length > 0 && currentUser
          && (
          <SuggestedUsers
            currentUser={currentUser}
            setUsers={setUsers}
            users={users.filter((user) => user.id !== loggedInUser.id)}
          />
          )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
