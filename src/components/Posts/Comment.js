import React, { useState, useEffect } from 'react';
import { Card, Icon, Modal, Loader, Dimmer } from 'semantic-ui-react';
import UserThumbnail from './UserThumbnail';
import dateFormatter from '../../utils/dateFormatter';
import UserProfileLink from '../UserProfile/UserProfileLink';
import commentService from '../../services/comments';
import UserLists from '../UserProfile/UserLists';

const Comment = ({ comment, post, isDetailedPage, index, handleCommentLike, handleEditPost, likeLoading, likeDisabled }) => {
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
    <>
      { loggedInUser && (
      <div key={index} className={isDetailedPage ? 'detailed-comment-text' : 'post-comment-display'}>

        { isDetailedPage && <UserThumbnail profileImage={comment.user.profileImage} color='fff' /> }

        <div className={isDetailedPage ? 'detailed-post-comment-text-like-box' : 'regular-post-comment-text-like-box'}>
          <div style={{ overflowWrap: 'anywhere' }}>
            <Card.Content
              key={index + comment.comment}
              // className={isDetailedPage ? 'detailed-post-comment-long' : 'post-comment-long'}
            >
              <UserProfileLink style={{ fontWeight: '700' }} userId={comment.user.id} username={comment.user.username} />
              {comment.comment}
            </Card.Content>

            <div style={{ display: 'flex', marginTop: '5px' }}>
              {/* Date */}
              { isDetailedPage
                && <Card.Meta key={index + comment.date.toString()} className='detailed-comment-time'>{dateFormatter.timeSinceCondensed(comment.date)}</Card.Meta>}

              {/* Likes */}
              { isDetailedPage && comment.likes.length > 0
                && (
                <Card.Content
                  style={{ fontSize: '12px', marginLeft: '10px', color: '#8e8e8e', fontWeight: '600', cursor: 'pointer' }}
                  key={index}
                  onClick={() => handleOpenLikes(comment.likes)}
                >
                  {comment.likes.length} likes
                </Card.Content>
                )}
            </div>
          </div>

          {/* Edit and Like Button */}
          <div className='comment-interact-icons' style={{ marginTop: 'auto', marginBottom: 'auto' }}>

            { loggedInUser.id === comment.user.id
                && <Icon onClick={() => setShowActionModal(true)} color='grey' name='ellipsis horizontal' className='comment-edit-icon' />}

            {comment.likes.findIndex((like) => like.id === loggedInUser.id) === -1
              ? <Icon disabled={likeDisabled} loading={likeLoading[index]} onClick={() => handleCommentLike(post.id, comment, comment.likes, index)} name={likeLoading[index] ? 'spinner' : 'heart outline'} color='grey' className='comment-like-icon' />
              : <Icon disabled={likeDisabled} loading={likeLoading[index]} onClick={() => handleCommentLike(post.id, comment, comment.likes, index)} name={likeLoading[index] ? 'spinner' : 'heart'} color={likeLoading[index] ? 'black' : 'red'} className='comment-like-icon' />}
          </div>
        </div>

        <div style={{ flexBasis: '100%', height: '0' }}></div>

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
      )}
    </>
  );
};

export default Comment;
