import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import dateFormatter from '../utils/dateFormatter';
import postService from '../services/posts';
import UserThumbnail from './UserThumbnail';
import DetailedPostContent from './DetailedPost/DetailedPostContent';
import { Link } from 'react-router-dom';

const PostTextSection = ({ post, isDetailedPage, handleEditPost }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));

  const handleCommentLike = async (postId, comment, likes, commentIndex) => {
    let newLikes = [];
    if (likes.findIndex((user) => user === loggedInUser.username) === -1) {
      likes.push(loggedInUser.username);
      newLikes = likes;
    } else {
      newLikes = likes.filter((user) => user !== loggedInUser.username);
    }
    const newComment = { ...comment, likes: newLikes };
    const newComments = post.comments;
    newComments[commentIndex] = newComment;

    const response = await postService.patchPost(postId, { comments: newComments });
    if (response) {
      handleEditPost(postId, response);
    }
  };

  return (
    <Card.Content className={isDetailedPage ? 'detailed-comment-content' : 'post-comment-content'} style={{ borderTop: 'none', paddingLeft: '16px' }}>

      <div style={{ display: 'grid' }}>

        { isDetailedPage
          && <DetailedPostContent post={post} />}

        { !isDetailedPage
          &&
        (
          <div className='post-comment-display'>
            <Card.Header className='post-subheader'>
              <Link to={`/user/${post.user.id}`} style={{color: 'black'}}>
                {post.user.username}
              </Link>
            </Card.Header>
            <Card.Description className='post-content'>
              {post.content}
            </Card.Description>
          </div>
        )
        }

        {post.comments.map((comment, index) => (
          <div key={index} className={isDetailedPage ? 'detailed-comment-text' : 'post-comment-display'}>
            { isDetailedPage && <UserThumbnail comment={comment} /> }
            <Card.Content key={index + comment.username} style={{ fontWeight: '700' }}> 
              <Link to={`/user/${comment.user.id}`} style={{color: 'black'}}>
                {comment.user.username}
              </Link>
            </Card.Content>
            <Card.Content key={index + comment.comment} style={{ marginLeft: '5px' }}>{comment.comment}</Card.Content>
            {comment.likes.findIndex((user) => user === loggedInUser.username) === -1
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
        ))}
      </div>

    </Card.Content>
  );
};

export default PostTextSection;
