import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import Posts from './Posts';
import userService from '../services/user';
import SuggestedUsers from './SuggestedUsers';

const Home = ({ posts, handleNewPost, handleEditPost, handleDeletePost }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      let response = await userService.getAllUsers();
      console.log('Users:', response);
      setUsers(response);
      response = await userService.getUser(loggedInUser.id);
      console.log('Current user:', response);
      setCurrentUser(response);
    };
    getAllUsers();
  }, []);

  return (
    <Grid columns='2' centered>
      <Grid.Row>
        <Grid.Column width='8'>
          <Posts
            posts={posts}
            handleNewPost={handleNewPost}
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
