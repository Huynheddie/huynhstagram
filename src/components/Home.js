import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import Posts from './Posts';
import userService from '../services/user';
import UserThumbnail from './Posts/UserThumbnail';

const Home = ({ posts, handleNewPost, handleEditPost, handleDeletePost }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [users, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getAllUsers = async () => {
      let response = await userService.getAllUsers();
      console.log('Users:', response);
      setUser(response);
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

        <Grid.Column width='2' id='suggest-div'>
          <div className='suggest-wrapper'>
            <UserThumbnail profileImage={currentUser.profileImage} width={75} height={75} />
            <div className='suggest-header'>
              <h5 style={{ marginTop: '0', marginBottom: '0' }}>{currentUser.username}</h5>
              <p style={{ marginTop: '0', color: '#8e8e8e' }}>{currentUser.name}</p>
            </div>
          </div>
          <h3 className='suggestion-text-header'>Suggestions For You</h3>
          {users.map((user) => (
            <div key={user.id} className='suggestion-map-div'>
              <UserThumbnail profileImage={user.profileImage} width={35} height={35} />
              <h5 style={{ marginTop: '0', marginBottom: '0' }}>{user.username}</h5>
              <h5 className='suggest-follow-btn'>Follow</h5>
            </div>
          ))}
        </Grid.Column>

        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
