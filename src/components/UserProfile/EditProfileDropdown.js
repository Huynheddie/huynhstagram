import React, { useState } from 'react';
import { Dropdown, Modal, Confirm, Input, Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import UpdateProfilePicture from './UpdateProfilePicture';
import userService from '../../services/user';

const EditProfileDropdown = ({ userBio, setUser }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newBio, setNewBio] = useState(userBio);
  const [newBioLoading, setNewBioLoading] = useState(false);
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

  const handleNewBioSubmit = async () => {
    setNewBioLoading(true);
    const response = await userService.updateBiography(loggedInUser.id, newBio);
    setUser(response);
    handleCloseModal();
    setNewBioLoading(false);
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
          <Dropdown.Item text='Change Profile' onClick={() => setShowModal(true)} />
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
          <h3 style={{ marginBottom: '10px' }}>Change Biography</h3>
          <Form onSubmit={handleNewBioSubmit}>
            <Form.Field>
              <Input fluid value={newBio} onChange={(event) => setNewBio(event.target.value)} />
            </Form.Field>
            <Button
              color='instagram'
              type='submit'
              loading={newBioLoading}
              disabled={newBioLoading}
              style={{ float: 'right', marginTop: '10px', marginBottom: '10px' }}
            >Submit
            </Button>
          </Form>
        </Modal.Content>
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
