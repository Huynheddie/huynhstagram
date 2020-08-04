import React, { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import userService from '../../services/user';

const FollowButton = ({ user, setUser }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [isLoadingFollow, setIsLoadingFollow] = useState(false);

  const handleFollow = async (targetUserId) => {
    setIsLoadingFollow(true);
    const response = await userService.followOtherUser(loggedInUser.id, targetUserId);
    setUser(response.find((returnedUser) => returnedUser.id === user.id));
    setIsLoadingFollow(false);
  };

  return (
    user.followers.findIndex((x) => x.id === loggedInUser.id) !== -1
      ? (
        <Button
          basic
          icon
          id='profile-followed-btn'
          onClick={() => handleFollow(user.id)}
          loading={isLoadingFollow}
          disabled={isLoadingFollow}
        >
          <Icon color='black' name='user' />
          <Icon color='black' size='small' name='checkmark' />
        </Button>
      )
      : (
        <Button
          size='small'
          id='profile-follow-btn'
          onClick={() => handleFollow(user.id)}
          loading={isLoadingFollow}
          disabled={isLoadingFollow}
        >Follow
        </Button>
      )
  );
};

export default FollowButton;
