import React from 'react';
import { Link } from 'react-router-dom';

const UserProfileLink = ({ userId, username }) => (
  <Link to={`/user/${userId}`} className='user-profile-link'>
    {username}
  </Link>
);

export default UserProfileLink;
