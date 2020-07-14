import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import postService from '../services/posts';

const PostActions = ({ post, index, handleOpenModal, handleDeletePost }) => {
  const handleDelete = async (id) => {
    await postService.deletePost(id);
    handleDeletePost(id);
  };

  return (
    <Dropdown
      item
      direction='left'
      icon='ellipsis horizontal'
      position='right'
      style={{ fontSize: '18px', paddingRight: '15px', color: '#636363' }}
      className='more-options'
    >
      <Dropdown.Menu>
        <Dropdown.Item
          icon='edit outline'
          text='Edit'
          onClick={() => handleOpenModal(index)}
        />
        <Dropdown.Item
          icon='trash alternate outline'
          text='Remove'
          onClick={() => handleDelete(post.id)}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PostActions;
