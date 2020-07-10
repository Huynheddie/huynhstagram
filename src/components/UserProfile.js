import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const UserProfile = () => {
  const history = useHistory();
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    history.push('/');
  };

  return (
    <Card centered>
      <Card.Content style={{ textAlign: 'center' }}>
        <h1>Hi {loggedInUser.username}!</h1>
        <Button
          color='instagram'
          content='Log out'
          onClick={handleLogout}
        />

      </Card.Content>
    </Card>
  );
};

export default UserProfile;
