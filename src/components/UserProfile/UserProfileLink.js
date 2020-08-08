import React from 'react';
import { Link } from 'react-router-dom';

const UserProfileLink = ({ userId, username, handleCloseModal }) => (
  <Link style={{ paddingRight: '5px' }} to={`/user/${userId}`} className='user-profile-link' onClick={handleCloseModal || null}>
    {username}
  </Link>
);

export default UserProfileLink;
