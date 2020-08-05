import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import postService from '../../services/posts';

const PostInteractions = ({ post, handleEditPost, focus, setInputFocus }) => {
  const history = useHistory();
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  const handleLike = async (postId) => {
    const response = await postService.modifyLike(postId, loggedInUser.id);
    if (response) {
      console.log(response);
      handleEditPost(response);
    }
  };

  const handleComment = async () => {
    if (setInputFocus) {
      setInputFocus(focus + 1);
    } else {
      history.push(`/post/${post.id}`);
    }
  };

  return (
    <Menu borderless icon text className='post-icon-menu'>
      <Menu.Item onClick={() => handleLike(post.id)}>
        { post.likes.findIndex((x) => x.id === loggedInUser.id) === -1
          ? <Icon name='heart outline' size='large' style={{ cursor: 'pointer' }} />
          : <Icon name='heart' size='large' color='red' style={{ cursor: 'pointer' }} />}
      </Menu.Item>

      <Menu.Item onClick={handleComment}>
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

export default PostInteractions;
