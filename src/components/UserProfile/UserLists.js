import React, { useState, useEffect } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import UserThumbnail from '../Posts/UserThumbnail';
import UserProfileLink from './UserProfileLink';
import userService from '../../services/user';

const UserLists = ({ open, handleCloseModal, userList, listType, setUser, setUserList }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [isLoadingFollow, setIsLoadingFollow] = useState([]);

  useEffect(() => {
    setIsLoadingFollow(userList.map(() => false));

    return () => {
      console.log('leaving');
    };
  }, []);

  const handleFollow = async (targetUserId, index) => {
    let loading = [...isLoadingFollow];
    loading[index] = true;
    setIsLoadingFollow(loading);

    const response = await userService.followOtherUser(loggedInUser.id, targetUserId);
    setUser(response.find((returnedUser) => returnedUser.id === loggedInUser.id));
    setUserList(userList.map((user) => response.find((returnedUser) => returnedUser.id === user.id)));

    loading = [...loading];
    loading[index] = false;
    setIsLoadingFollow(loading);
  };

  return (
    <Modal
      centered
      open={open}
      onClose={handleCloseModal}
      closeOnDimmerClick
      closeOnEscape
      closeOnDocumentClick
      id='list-modal'
    >
      <Modal.Header style={{ textAlign: 'center', fontSize: '16px' }}>
        {listType === 'followers' ? 'Followers' : 'Following'}
        <Icon name='close' className='list-close-icon' size='large' onClick={handleCloseModal} />
      </Modal.Header>
      <Modal.Content>
        {userList.map((user, index) => (
          <div key={user.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <UserThumbnail profileImage={user.profileImage} color='ffffff' />
            <div>
              <UserProfileLink userId={user.id} username={user.username} />
              <p>{user.name}</p>
            </div>
            <Button
              basic={user.followers.findIndex((x) => x.id === loggedInUser.id) !== -1}
              loading={isLoadingFollow[index]}
              color={user.followers.findIndex((x) => x.id === loggedInUser.id) !== -1 ? 'black' : 'blue'}
              onClick={() => handleFollow(user.id, index)}
              id={user.followers.findIndex((x) => x.id === loggedInUser.id) !== -1 ? 'list-follow-btn' : 'suggest-follow-btn'}
            > { user.followers.findIndex((x) => x.id === loggedInUser.id) !== -1 ? 'Following' : 'Follow' }
            </Button>
          </div>
        ))}
      </Modal.Content>
    </Modal>
  );
};

export default UserLists;
