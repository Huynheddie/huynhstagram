import React, { useEffect } from 'react';
import UserProfileHeaderImage from './UserProfileHeaderImage';
import FollowButton from './FollowButton';
import EditProfileDropdown from './EditProfileDropdown';

const UserProfileHeader = ({ user, userPosts, setUser }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  useEffect(() => {
    console.log(user, userPosts);
  }, []);

  return (
    <>
      { user && userPosts && (
      <div className='profile-header'>
        <UserProfileHeaderImage user={user} />
        <div className='profile-text-header'>

          <div className='profile-text-header-info'>
            <h2 className='profile-text-username'>{user.username}</h2>
            { loggedInUser.id === user.id
               && <EditProfileDropdown />}
            { loggedInUser.id !== user.id
              && <FollowButton user={user} setUser={setUser} />}
          </div>

          <div className='profile-user-info'>
            <p><strong>{userPosts.length}</strong> posts</p>
            <p><strong>{user.followers.length}</strong> followers</p>
            <p><strong>{user.following.length}</strong> following</p>
          </div>

          <div className='profile-user-name'>
            <p><strong>{user.name}</strong></p>
          </div>

        </div>
      </div>
      )}
    </>
  );
};

export default UserProfileHeader;
