import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    history.push('/');
  };

  return (
    <Button
      color='instagram'
      content='Log out'
      onClick={handleLogout}
    />
  );
};

export default Logout;
