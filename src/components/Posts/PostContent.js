import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import UserThumbnail from './UserThumbnail';
import dateFormatter from '../../utils/dateFormatter';

const PostContent = ({ post, isDetailedPage }) => (
  <div className={isDetailedPage ? 'detailed-comment-text' : 'post-comment-display'}>
    { isDetailedPage && <UserThumbnail profileImage={post.user.profileImage} /> }
    <Card.Header className='post-subheader'>
      <Link to={`/user/${post.user.id}`} style={{ color: 'black' }}>
        {post.user.username}
      </Link>
    </Card.Header>
    <Card.Description className='post-content'>
      {post.content}
    </Card.Description>
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
