import React, { useState } from 'react';
import { Dropdown, Modal, Confirm, Input, Form, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import UpdateProfilePicture from './UpdateProfilePicture';
import userService from '../../services/user';

const EditProfileDropdown = ({ userBio, setUser }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [showUpdateBio, setShowUpdateBio] = useState(false);
  const [showUpdatePictureModal, setShowUpdatePictureModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [newBio, setNewBio] = useState(userBio);
  const [newBioLoading, setNewBioLoading] = useState(false);
  const history = useHistory();

  const handleCloseModal = () => {
    setShowUpdatePictureModal(false);
    setShowUpdateBio(false);
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
          <Dropdown.Item text='Change Biography' onClick={() => setShowUpdateBio(true)} />
          <Dropdown.Item text='Change Profile Picture' onClick={() => setShowUpdatePictureModal(true)} />
          <Dropdown.Item text='Delete Account' onClick={() => setShowConfirm(true)} />
        </Dropdown.Menu>
      </Dropdown>

      <Modal
        centered
        size='tiny'
        open={showUpdateBio}
        onClose={handleCloseModal}
        closeOnDocumentClick
        closeOnDimmerClick
        closeOnEscape
      >
        <Modal.Content>
          <h2>Edit Biography</h2>
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
            <Button color='red' style={{ marginTop: '10px' }} disabled={newBioLoading} onClick={handleCloseModal}>Cancel</Button>
          </Form>
        </Modal.Content>
      </Modal>

      <Modal
        centered
        size='tiny'
        open={showUpdatePictureModal}
        onClose={handleCloseModal}
        closeOnDocumentClick
        closeOnDimmerClick
        closeOnEscape
      >
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
