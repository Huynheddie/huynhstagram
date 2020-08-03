import React, { useEffect, useState } from 'react';
import UserProfileHeaderImage from './UserProfileHeaderImage';
import FollowButton from './FollowButton';
import EditProfileDropdown from './EditProfileDropdown';
import UserLists from './UserLists';

const UserProfileHeader = ({ user, userPosts, setUser }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [showModal, setShowModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const [listType, setListType] = useState();

  useEffect(() => {
    if (userList.length) {
      console.log('UserList:', userList);
    }
  }, [userList]);

  const handleOpenFollowers = () => {
    setListType('Followers');
    setUserList(user.followers);
    setShowModal(true);
  };

  const handleOpenFollowing = () => {
    setListType('Following');
    setUserList(user.following);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
            <p style={{ cursor: 'pointer' }} onClick={handleOpenFollowers}><strong>{user.followers.length}</strong> followers</p>
            <p style={{ cursor: 'pointer' }} onClick={handleOpenFollowing}><strong>{user.following.length}</strong> following</p>
          </div>

          <div className='profile-user-name'>
            <p><strong>{user.name}</strong></p>
          </div>
        </div>
        <UserLists open={showModal} handleCloseModal={handleCloseModal} user={user} userList={userList} listType={listType} setUser={setUser} setUserList={setUserList} />
      </div>
      )}
    </>
  );
};

export default UserProfileHeader;
