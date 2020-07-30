import React from 'react';
import { Link } from 'react-router-dom';

const UserProfileLink = ({ userId, username }) => (
  <Link to={`/user/${userId}`} style={{ color: 'black', fontWeight: '600' }}>
    {username}
  </Link>
);

export default UserProfileLink;
