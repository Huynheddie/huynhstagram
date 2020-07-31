import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import postService from '../../services/posts';

const PostActions = ({ isDetailedPage, post, index, handleOpenModal, handleDeletePost }) => {
  const history = useHistory();

  const handleDelete = async (id) => {
    await postService.deletePost(id);
    await handleDeletePost(id);
    history.push('/');
  };

  return (
    <Dropdown
      item
      direction='left'
      icon='ellipsis horizontal'
      // position='right'
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
          onClick={() => handleDelete(post.id)}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PostActions;
