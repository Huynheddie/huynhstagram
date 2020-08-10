import React from 'react';
import { Menu } from 'semantic-ui-react';
import postHelper from '../../utils/postHelper';
import PostActions from './PostActions';
import UserThumbnail from './UserThumbnail';
import UserProfileLink from '../UserProfile/UserProfileLink';

const PostHeader = ({ post, index, isDetailedPage, handleOpenModal, handleDeletePost }) => (
  <Menu borderless fluid icon id={isDetailedPage ? 'detailed-post-header' : ''} style={{ borderRadius: '0px' }}>
    <Menu.Item style={{ paddingRight: isDetailedPage ? '0' : '' }}>
      <UserThumbnail userId={post.user.id} profileImage={post.user.profileImage} />
    </Menu.Item>

    <Menu.Item style={{ paddingLeft: '0' }}>
      <UserProfileLink userId={post.user.id} username={post.user.username} />
    </Menu.Item>
    <Menu.Item position='right'></Menu.Item>

    { postHelper.userOwnedPost(post)
      && <PostActions isDetailedPage={isDetailedPage} index={index} post={post} handleOpenModal={handleOpenModal} handleDeletePost={handleDeletePost} />}

  </Menu>
);

export default PostHeader;
