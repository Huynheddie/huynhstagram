import React, { useState, useEffect } from 'react';
import { Card, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';
import UserThumbnail from './UserThumbnail';
import dateFormatter from '../../utils/dateFormatter';
import UserProfileLink from '../UserProfile/UserProfileLink';
import commentService from '../../services/comments';
import UserLists from '../UserProfile/UserLists';

const Comment = ({ comment, post, isDetailedPage, index, handleCommentLike, handleEditPost, likeLoading }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [showActionModal, setShowActionModal] = useState(false);
  const [removalLoading, setRemovalLoading] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [userList, setUserList] = useState([]);

  const handleCloseModal = () => {
    setShowActionModal(false);
  };

  const handleRemoveComment = async () => {
    setRemovalLoading(true);
    const response = await commentService.removeComment(post.id, comment._id);
    // console.log(response);
    handleEditPost(response);
    setRemovalLoading(false);
  };

  useEffect(() => {
    if (!removalLoading) {
      setShowActionModal(false);
    }
  }, [removalLoading]);

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
  };

  const handleOpenLikes = (likes) => {
    console.log(likes);
    setUserList(likes);
    setShowLikeModal(true);
  };

  return (
    <div key={index} className={isDetailedPage ? 'detailed-comment-text' : 'post-comment-display'}>

      { isDetailedPage && <UserThumbnail profileImage={comment.user.profileImage} /> }

      <Card.Content key={index + comment.user.username} style={{ fontWeight: '700' }}>
        <UserProfileLink userId={comment.user.id} username={comment.user.username} />
      </Card.Content>

      <Card.Content key={index + comment.comment} style={{ marginLeft: '5px', overflowWrap: 'anywhere' }}>{comment.comment}</Card.Content>

      <div className='comment-interact-icons'>
        { loggedInUser.id === comment.user.id
            && <Icon onClick={() => setShowActionModal(true)} color='grey' name='ellipsis horizontal' className='comment-edit-icon' />}

        {comment.likes.findIndex((like) => like.id === loggedInUser.id) === -1
          ? <Icon loading={likeLoading} onClick={() => handleCommentLike(post.id, comment, comment.likes)} name={likeLoading ? 'spinner' : 'heart outline'} color='grey' className='comment-like-icon' />
          : <Icon loading={likeLoading} onClick={() => handleCommentLike(post.id, comment, comment.likes)} name={likeLoading ? 'spinner' : 'heart'} color={likeLoading ? 'black' : 'red'} className='comment-like-icon' />}
      </div>
      <div style={{ flexBasis: '100%', height: '0' }}></div>

      { isDetailedPage
        && (
          <>
            <Card.Meta key={index + comment.date.toString()} className='detailed-comment-time'>{dateFormatter.timeSinceCondensed(comment.date)}</Card.Meta>
            {comment.likes.length > 0
            && (
            <Card.Content
              style={{ fontSize: '12px', paddingLeft: '10px', color: '#8e8e8e', fontWeight: '600', cursor: 'pointer' }}
              key={index}
              onClick={() => handleOpenLikes(comment.likes)}
            >
              {comment.likes.length} likes
            </Card.Content>
            )}
          </>
        )}

      <Modal
        centered
        open={showActionModal}
        onClose={handleCloseModal}
        size='tiny'
        id='comment-edit-modal'
      >
        <Modal.Content onClick={!removalLoading ? handleRemoveComment : null} style={{ borderBottom: '1px solid #dbdbdb', cursor: 'pointer' }}>
          { !removalLoading
            ? <h3 style={{ color: '#ed4956' }} className='comment-edit-options'>Delete</h3>
            : (
              <div style={{ height: '18px' }}>
                <Dimmer active inverted style={{ maxHeight: '61px' }}>
                  <Loader inverted />
                </Dimmer>
              </div>
            )}
        </Modal.Content>
        <Modal.Content onClick={handleCloseModal} style={{ cursor: 'pointer' }}>
          <h3 style={{ fontWeight: '400' }} className='comment-edit-options'>Cancel</h3>
        </Modal.Content>
      </Modal>

      <UserLists open={showLikeModal} handleCloseModal={handleCloseLikeModal} userList={userList} listType='Likes' setUserList={setUserList} />

    </div>
  );
};

export default Comment;
