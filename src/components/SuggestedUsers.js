import React, { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserThumbnail from './Posts/UserThumbnail';
import userService from '../services/user';
import UserProfileLink from './UserProfile/UserProfileLink';

const SuggestedUsers = ({ currentUser, users, setUsers }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [isLoadingFollow, setIsLoadingFollow] = useState([]);

  useEffect(() => {
    setIsLoadingFollow(users.map(() => false));
  }, []);

  const handleFollow = async (targetUserId, index) => {
    let loading = [...isLoadingFollow];
    loading[index] = true;
    setIsLoadingFollow(loading);

    const response = await userService.followOtherUser(loggedInUser.id, targetUserId);
    setUsers(response);

    loading = [...loading];
    loading[index] = false;
    setIsLoadingFollow(loading);
  };

  return (
    <Grid.Column width='2' id='suggest-div'>
      <div className='suggest-wrapper'>
        <UserThumbnail profileImage={currentUser.profileImage} width={75} height={75} />
        <div className='suggest-header'>
          <h5 style={{ marginTop: '0', marginBottom: '0' }}>{currentUser.username}</h5>
          <p style={{ marginTop: '0', color: '#8e8e8e' }}>{currentUser.name}</p>
        </div>
      </div>

      <h3 className='suggestion-text-header'>Suggestions For You</h3>
      {users.map((user, index) => (
        <div key={user.id} className='suggestion-map-div'>
          <UserThumbnail profileImage={user.profileImage} width={35} height={35} />
          <UserProfileLink userId={user.id} username={user.username} />
          <Button
            basic
            loading={isLoadingFollow[index]}
            color={user.followers.includes(loggedInUser.id) ? 'black' : 'blue'}
            onClick={() => handleFollow(user.id, index)}
            id='suggest-follow-btn'
          > { user.followers.includes(loggedInUser.id) ? 'Following' : 'Follow' }
          </Button>
        </div>
      ))}
    </Grid.Column>
  );
};

export default SuggestedUsers;
