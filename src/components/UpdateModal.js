import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'semantic-ui-react';
import postService from '../services/posts';

const UpdateModal = ({ oldUserName, oldContent, oldId, handleEditPost }) => {
  const [userName, setUserName] = useState(oldUserName);
  const [content, setContent] = useState(oldContent);
  const [showModal, setShowModal] = useState(false);

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userName && content) {
      setShowModal(false);
      const response = await postService.updatePost(oldId, { userName, date: new Date(), content });
      if (response) {
        handleEditPost(oldId, response);
      }
    }
  };

  return (
    <Modal
      centered
      dimmer='inverted'
      size='small'
      open={showModal}
      onClose={() => setShowModal(false)}
      trigger={<Button color='yellow' style={{ marginRight: '10px' }} onClick={() => setShowModal(true)}>Update</Button>}
    >
      <Modal.Header>Update Post</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label htmlFor='username-input'>Username</label>
            <Input id='username-input' value={userName} onChange={handleUserNameChange} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='content-input'>Content</label>
            <Input id='content-input' value={content} onChange={handleContentChange} />
          </Form.Field>
          <Button color='instagram' type='submit'>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateModal;
