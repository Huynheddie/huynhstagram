import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'semantic-ui-react';
import postService from '../../services/posts';

const UpdateModal = ({ isDetailedPage, index, showUpdateModal, oldContent, oldId, handleEditPost, handleCloseModal }) => {
  const [content, setContent] = useState(oldContent);
  const [loading, setLoading] = useState(false);

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content) {
      setLoading(true);
      handleCloseModal();
      const response = await postService.updatePost(oldId, { content });
      if (response) {
        if (isDetailedPage) {
          handleEditPost(response);
        } else {
          handleEditPost(oldId, response);
        }
      }
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      size='small'
      open={showUpdateModal}
      onClose={isDetailedPage ? handleCloseModal : () => handleCloseModal(index)}
      closeOnDocumentClick
      closeOnDimmerClick
      closeOnEscape
    >
      <Modal.Content>
        <h2>Edit Post Caption</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input value={content} onChange={handleContentChange} />
          </Form.Field>
          <Button type='button' disabled={loading} color='red' onClick={() => handleCloseModal(index)}>Cancel</Button>
          <Button type='submit' disabled={loading} loading={loading} style={{ float: 'right', marginBottom: '10px', backgroundColor: '#2185d0', color: 'white' }}>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateModal;
