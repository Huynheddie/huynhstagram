import React from 'react';
import { Card } from 'semantic-ui-react';
import UserThumbnail from './UserThumbnail';
import dateFormatter from '../../utils/dateFormatter';
import UserProfileLink from '../UserProfile/UserProfileLink';

const PostContent = ({ post, isDetailedPage }) => (
  <div className={isDetailedPage ? 'detailed-comment-text' : 'post-comment-display'}>
    { isDetailedPage
    && (
    <div style={{ marginBottom: 'auto' }}>
      <UserThumbnail profileImage={post.user.profileImage} color='fff' />
    </div>
    ) }

    { isDetailedPage
    && (
    <Card.Description className='post-content-long'>
      <UserProfileLink userId={post.user.id} username={post.user.username} className='post-subheader' />
      {post.content}
    </Card.Description>
    )}

    { !isDetailedPage && (
    <Card.Description className='post-homepage-content-long'>
      <UserProfileLink userId={post.user.id} username={post.user.username} className='post-subheader' />
      {post.content}
    </Card.Description>
    )}

    { isDetailedPage
      && (
      <>
        <div style={{ flexBasis: '100%', height: '0' }}></div>
        <Card.Meta className='detailed-comment-time'>{dateFormatter.timeSinceCondensed(post.date)}</Card.Meta>
      </>
      )}
  </div>
);

export default PostContent;
