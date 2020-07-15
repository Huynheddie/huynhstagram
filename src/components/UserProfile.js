import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import userService from '../services/user';
import Logout from './Logout';
import UpdateProfilePicture from './UpdateProfilePicture';
import UserProfileHeader from './UserProfileHeader';

const UserProfile = () => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  const [user, setUser] = useState();

  useEffect(() => {
    const findUser = async () => {
      const response = await userService.getUser(loggedInUser.id);
      setUser(response);
    };

    findUser();
  }, [loggedInUser.id]);

  return (
    <>
      { user
      && (
      <>
        <Card centered>
          <UserProfileHeader user={user} />
          <UpdateProfilePicture />
        </Card>

        <Logout />

      </>
      )}

    </>
  );
};

export default UserProfile;
