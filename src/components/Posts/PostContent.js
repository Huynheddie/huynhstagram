import React from 'react';
import { Card } from 'semantic-ui-react';
import UserThumbnail from './UserThumbnail';
import dateFormatter from '../../utils/dateFormatter';
import UserProfileLink from '../UserProfile/UserProfileLink';

const PostContent = ({ post, isDetailedPage }) => (
  <div className={isDetailedPage ? 'detailed-comment-text' : 'post-comment-display'}>
    { isDetailedPage
      && <UserThumbnail userId={post.user.id} profileImage={post.user.profileImage} color='fff' />}

    { isDetailedPage
    && (
    <Card.Description className='post-content-long' style={{ width: '85%' }}>
      <UserProfileLink userId={post.user.id} username={post.user.username} className='post-subheader' />
      {post.content}
      <Card.Meta className='detailed-comment-time'>{dateFormatter.timeSinceCondensed(post.date)}</Card.Meta>
    </Card.Description>
    )}

    { !isDetailedPage && (
    <Card.Description className='post-homepage-content-long'>
      <UserProfileLink userId={post.user.id} username={post.user.username} className='post-subheader' />
      {post.content}
    </Card.Description>
    )}
  </div>
);

export default PostContent;
