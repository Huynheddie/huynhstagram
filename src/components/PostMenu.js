import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import postService from '../services/posts';

const PostMenu = ({ post, handleEditPost }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  const handleLike = async (postId, likes) => {
    let newLikes = [];
    if (likes.findIndex((user) => user === loggedInUser.username) === -1) {
      likes.push(loggedInUser.username);
      newLikes = likes;
    } else {
      newLikes = likes.filter((user) => user !== loggedInUser.username);
    }
    const response = await postService.patchPost(postId, { likes: newLikes });
    if (response) {
      handleEditPost(postId, response);
    }
  };

  return (
    <Menu borderless icon text className='post-icon-menu'>
      <Menu.Item onClick={() => handleLike(post.id, post.likes)}>
        { post.likes.findIndex((user) => user === loggedInUser.username) === -1
          ? <Icon name='heart outline' size='large' style={{ cursor: 'pointer' }} />
          : <Icon name='heart' size='large' color='red' style={{ cursor: 'pointer' }} />}
      </Menu.Item>

      <Menu.Item>
        <Icon name='comment outline' size='large' style={{ cursor: 'pointer' }} />
      </Menu.Item>

      <Menu.Item>
        <Icon name='paper plane outline' size='large' style={{ cursor: 'pointer' }} />
      </Menu.Item>

      <Menu.Item position='right'>
        <Icon name='bookmark outline' size='large' style={{ cursor: 'pointer' }} />
      </Menu.Item>

    </Menu>
  );
};

export default PostMenu;
