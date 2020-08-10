import React, { useState } from 'react';
import { Dropdown, Modal, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import postService from '../../services/posts';

const PostActions = ({ isDetailedPage, post, index, handleOpenModal, handleDeletePost }) => {
  const history = useHistory();
  const [showDelete, setShowDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    await postService.deletePost(id);
    if (isDetailedPage) {
      handleDeletePost();
    } else {
      await handleDeletePost(id);
    }
    history.push('/');
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  return (
    <>
      <Dropdown
        item
        direction='left'
        icon='ellipsis horizontal'
        style={{ fontSize: '18px', paddingRight: '15px', color: '#636363' }}
        className='more-options'
      >
        <Dropdown.Menu>
          <Dropdown.Item
            icon='edit outline'
            text='Edit'
            onClick={isDetailedPage ? handleOpenModal : () => handleOpenModal(index)}
          />
          <Dropdown.Item
            icon='trash alternate outline'
            text='Remove'
            onClick={() => setShowDelete(true)}
          />
        </Dropdown.Menu>
      </Dropdown>

      <Modal
        centered
        size='small'
        open={showDelete}
        onClose={handleCloseDelete}
        closeOnDimmerClick
        closeOnDocumentClick
        closeOnEscape
      >
        <Modal.Content>
          <h3>Are you sure you want to delete this post?</h3>
          <Button loading={deleteLoading} onClick={() => handleDelete(post.id)} color='instagram' style={{ float: 'right' }}>Delete</Button>
          <Button disabled={deleteLoading} onClick={handleCloseDelete} color='red'>Cancel</Button>
        </Modal.Content>

      </Modal>

    </>
  );
};

export default PostActions;
