import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import UserThumbnail from './UserThumbnail';
import dateFormatter from '../../utils/dateFormatter';
import UserProfileLink from '../UserProfile/UserProfileLink';

const Comment = ({ comment, post, isDetailedPage, index, handleCommentLike }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  return (
    <div key={index} className={isDetailedPage ? 'detailed-comment-text' : 'post-comment-display'}>

      { isDetailedPage && <UserThumbnail profileImage={comment.profileImage} /> }

      <Card.Content key={index + comment.username} style={{ fontWeight: '700' }}>
        <UserProfileLink userId={comment.user.id} username={comment.user.username} />
      </Card.Content>

      <Card.Content key={index + comment.comment} style={{ marginLeft: '5px' }}>{comment.comment}</Card.Content>

      {comment.likes.findIndex((like) => like.user.id === loggedInUser.id) === -1
        ? <Icon onClick={() => handleCommentLike(post.id, comment, comment.likes, index)} name='heart outline' color='grey' className='comment-like-icon' />
        : <Icon onClick={() => handleCommentLike(post.id, comment, comment.likes, index)} name='heart' color='red' className='comment-like-icon' />}
      <div style={{ flexBasis: '100%', height: '0' }}></div>

      { isDetailedPage
      && (
        <>
          <Card.Meta key={index + comment.date.toString()} className='detailed-comment-time'>{dateFormatter.timeSinceCondensed(comment.date)}</Card.Meta>
          {comment.likes.length > 0
          && <Card.Content style={{ fontSize: '12px', paddingLeft: '10px', color: '#8e8e8e', fontWeight: '600' }} key={index}>{comment.likes.length} likes</Card.Content>}
        </>
      )}

    </div>
  );
};

export default Comment;
