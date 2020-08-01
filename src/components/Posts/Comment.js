import React, { useEffect, useState } from 'react';
import { Card, Icon, Modal } from 'semantic-ui-react';
import UserThumbnail from './UserThumbnail';
import dateFormatter from '../../utils/dateFormatter';
import UserProfileLink from '../UserProfile/UserProfileLink';
import commentService from '../../services/comments';

const Comment = ({ comment, post, isDetailedPage, index, handleCommentLike, handleEditPost }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [showActionModal, setShowActionModal] = useState(false);

  useEffect(() => {
    console.log(comment);
  }, []);

  const handleCloseModal = () => {
    setShowActionModal(false);
  };

  const handleRemoveComment = async () => {
    const response = await commentService.removeComment(post.id, comment._id);
    console.log(response);
    handleEditPost(post.id, response);
  };

  return (
    <div key={index} className={isDetailedPage ? 'detailed-comment-text' : 'post-comment-display'}>

      { isDetailedPage && <UserThumbnail profileImage={comment.user.profileImage} /> }

      <Card.Content key={index + comment.username} style={{ fontWeight: '700' }}>
        <UserProfileLink userId={comment.user.id} username={comment.user.username} />
      </Card.Content>

      <Card.Content key={index + comment.comment} style={{ marginLeft: '5px' }}>{comment.comment}</Card.Content>

      { loggedInUser.id === comment.user.id
        && <Icon onClick={() => setShowActionModal(true)} color='grey' name='ellipsis horizontal' className='comment-edit-icon' />}

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

      <Modal
        centered
        open={showActionModal}
        onClose={handleCloseModal}
        closeOnDocumentClick
        closeOnDimmerClick
        closeOnEscape
        size='tiny'
        id='comment-edit-modal'
      >
        <Modal.Content style={{ borderBottom: '1px solid #dbdbdb', cursor: 'pointer' }}>
          <h3 onClick={handleRemoveComment} style={{ color: '#ed4956' }} className='comment-edit-options'>Delete</h3>
        </Modal.Content>
        <Modal.Content style={{ cursor: 'pointer' }}>
          <h3 onClick={handleCloseModal} style={{ fontWeight: '400' }} className='comment-edit-options'>Cancel</h3>
        </Modal.Content>
      </Modal>

    </div>
  );
};

export default Comment;
