import React, { useState } from 'react';
import { Dropdown, Modal, Confirm } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import UpdateProfilePicture from './UpdateProfilePicture';
import userService from '../../services/user';

const EditProfileDropdown = () => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const history = useHistory();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteUser = async () => {
    const response = await userService.deleteUser(loggedInUser.id);
    console.log(response);
    localStorage.removeItem('loggedInUser');
    history.push('/');
  };

  return (
    <>
      <Dropdown
        text='Edit Profile'
        button
        basic
        icon={null}
        id='profile-header-edit-btn'
        direction='right'
      >
        <Dropdown.Menu>
          <Dropdown.Item text='Change Profile Picture' onClick={() => setShowModal(true)} />
          <Dropdown.Item text='Delete Account' onClick={() => setShowConfirm(true)} />
        </Dropdown.Menu>
      </Dropdown>
      <Modal
        centered
        size='tiny'
        open={showModal}
        onClose={handleCloseModal}
        closeOnDocumentClick
        closeOnDimmerClick
        closeOnEscape
      >
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Content>
          <UpdateProfilePicture handleCloseModal={handleCloseModal} />
        </Modal.Content>
      </Modal>
      <Confirm
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeleteUser}
      />
    </>
  );
};

export default EditProfileDropdown;
