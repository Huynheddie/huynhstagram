import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'semantic-ui-react';
import postService from '../services/posts';

const UpdateModal = ({ index, showUpdateModal, oldContent, oldId, handleEditPost, handleCloseModal }) => {
  const [content, setContent] = useState(oldContent);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content) {
      handleCloseModal();
      const response = await postService.updatePost(oldId, { content });
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
      open={showUpdateModal}
      onClose={() => handleCloseModal(index)}
      closeOnDocumentClick
      closeOnDimmerClick
      closeOnEscape
    >
      <Modal.Header>Update Post</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label htmlFor='content-input'>Content</label>
            <Input value={content} onChange={handleContentChange} />
          </Form.Field>
          <Button color='instagram' type='submit'>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateModal;
