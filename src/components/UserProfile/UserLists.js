import React, { useState, useEffect } from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import UserThumbnail from '../Posts/UserThumbnail';
import UserProfileLink from './UserProfileLink';
import userService from '../../services/user';

const UserLists = ({ open, handleCloseModal, userList, listType, user, setUser, setUserList }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [isLoadingFollow, setIsLoadingFollow] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsLoadingFollow(userList.map(() => false));
  }, []);

  const handleFollow = async (targetUserId, index) => {
    let loading = [...isLoadingFollow];
    loading[index] = true;
    setIsLoadingFollow(loading);
    setIsDisabled(true);

    const response = await userService.followOtherUser(loggedInUser.id, targetUserId);
    if (setUser && user.id === loggedInUser.id) {
      setUser(response.find((returnedUser) => returnedUser.id === loggedInUser.id));
    }
    setUserList(userList.map((x) => response.find((returnedUser) => returnedUser.id === x.id)));

    loading = [...loading];
    loading[index] = false;
    setIsLoadingFollow(loading);
    setIsDisabled(false);
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
        {listType}
        <Icon name='close' className='list-close-icon' size='large' onClick={handleCloseModal} />
      </Modal.Header>
      <Modal.Content>
        {userList.map((userObj, index) => (
          <div key={userObj.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <UserThumbnail profileImage={userObj.profileImage} color='ffffff' />
            <div>
              <UserProfileLink userId={userObj.id} username={userObj.username} />
              <p>{userObj.name}</p>
            </div>
            { userObj.id !== loggedInUser.id && (
            <Button
              basic={userObj.followers.findIndex((x) => x.id === loggedInUser.id) !== -1}
              loading={isLoadingFollow[index]}
              color={userObj.followers.findIndex((x) => x.id === loggedInUser.id) !== -1 ? 'black' : 'blue'}
              onClick={() => handleFollow(userObj.id, index)}
              id={userObj.followers.findIndex((x) => x.id === loggedInUser.id) !== -1 ? 'list-follow-btn' : 'suggest-follow-btn'}
              disabled={isDisabled}
            > { userObj.followers.findIndex((x) => x.id === loggedInUser.id) !== -1 ? 'Following' : 'Follow' }
            </Button>
            )}
          </div>
        ))}
      </Modal.Content>
    </Modal>
  );
};

export default UserLists;
