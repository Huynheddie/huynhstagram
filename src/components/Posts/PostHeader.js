import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import postHelper from '../../utils/postHelper';
import PostActions from './PostActions';
import UserThumbnail from './UserThumbnail';

const PostHeader = ({ post, index, isDetailedPage, handleOpenModal, handleDeletePost }) => (
  <Menu borderless fluid icon id={isDetailedPage ? 'detailed-post-header' : ''} style={{ borderRadius: '0px' }}>
    <Menu.Item style={{ paddingRight: isDetailedPage ? '0' : '' }}>
      <UserThumbnail profileImage={post.user.profileImage} />
    </Menu.Item>

    <Menu.Item style={{ fontWeight: '700', paddingLeft: '0' }}>
      <Link to={`/user/${post.user.id}`} style={{ color: 'black' }}>
        {post.user.username}
      </Link>
    </Menu.Item>
    <Menu.Item position='right'></Menu.Item>

    { postHelper.userOwnedPost(post)
      && <PostActions isDetailedPage={isDetailedPage} index={index} post={post} handleOpenModal={handleOpenModal} handleDeletePost={handleDeletePost} />}

  </Menu>
);

export default PostHeader;
