import React from 'react';
import { Card } from 'semantic-ui-react';
import UserThumbnail from './UserThumbnail';
import dateFormatter from '../../utils/dateFormatter';
import UserProfileLink from '../UserProfile/UserProfileLink';

const PostContent = ({ post, isDetailedPage }) => (
  <div className={isDetailedPage ? 'detailed-comment-text' : 'post-comment-display'}>
    { isDetailedPage && <UserThumbnail profileImage={post.user.profileImage} /> }
    <Card.Header className='post-subheader'>
      <UserProfileLink userId={post.user.id} username={post.user.username} />
    </Card.Header>

    { isDetailedPage
    && (
    <Card.Description className={post.content.length < 25 ? 'post-content' : 'post-content-long'}>
      {post.content}
    </Card.Description>
    )}

    { !isDetailedPage && (
    <Card.Description className={post.content.length < 65 ? 'post-content' : 'post-homepage-content-long'}>
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
