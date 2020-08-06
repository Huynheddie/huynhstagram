import React, { useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import postService from '../../services/posts';

const PostInteractions = ({ isDetailedPage, post, handleEditPost, focus, setInputFocus }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  const handleLike = async (postId) => {
    setLoading(true);
    const response = await postService.modifyLike(postId, loggedInUser.id);
    if (response) {
      console.log(response);
      if (isDetailedPage) {
        handleEditPost(response);
      } else {
        handleEditPost(postId, response);
      }
    }
    setLoading(false);
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
          ? <Icon loading={loading} name={loading ? 'spinner' : 'heart outline'} size='large' style={{ cursor: 'pointer' }} />
          : <Icon loading={loading} name={loading ? 'spinner' : 'heart'} size='large' color='red' style={{ cursor: 'pointer' }} />}
      </Menu.Item>

      <Menu.Item onClick={handleComment}>
        <Icon name='comment outline' size='large' style={{ cursor: 'pointer' }} />
      </Menu.Item>

      {/* <Menu.Item>
        <Icon name='paper plane outline' size='large' style={{ cursor: 'pointer' }} />
      </Menu.Item>

      <Menu.Item position='right'>
        <Icon name='bookmark outline' size='large' style={{ cursor: 'pointer' }} />
      </Menu.Item> */}

    </Menu>
  );
};

export default PostInteractions;
