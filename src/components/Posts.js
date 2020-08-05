import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import { Image } from 'cloudinary-react';
import UpdateModal from './Posts/UpdateModal';
import PostInteractions from './Posts/PostInteractions';
import CommentInput from './Posts/CommentInput';
import PostComments from './Posts/PostComments';
import PostHeader from './Posts/PostHeader';
import dateFormatter from '../utils/dateFormatter';
import UserLists from './UserProfile/UserLists';

const Posts = ({ pageLoading, posts, handleDeletePost, handleEditPost }) => {
  const [showUpdateModal, setShowUpdateModal] = useState([]);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setShowUpdateModal(posts.map(() => false));
  }, [posts]);

  const handleCloseModal = (index) => {
    setShowUpdateModal(showUpdateModal.map((modal, i) => (i === index ? false : modal)));
  };

  const handleOpenModal = (index) => {
    setShowUpdateModal(showUpdateModal.map((modal, i) => (i === index ? true : modal)));
  };

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
  };

  const handleOpenLikes = (likes) => {
    console.log(likes);
    setUserList(likes);
    setShowLikeModal(true);
  };

  return (
    <div>
      { !pageLoading && posts.map((post, index) => (
        <Card key={post.id} centered style={{ width: '600px', overflow: 'hidden', marginBottom: '20px' }}>

          <Card.Header className='post-header'>
            <PostHeader post={post} index={index} isDetailedPage={false} handleOpenModal={handleOpenModal} handleDeletePost={handleDeletePost} />
          </Card.Header>

          <Image
            cloudName='huynhstagram'
            publicId={post.imageId}
            width='650'
            style={{ width: '100%' }}
          />

          <PostInteractions post={post} handleEditPost={handleEditPost} />

          <Card.Content style={{ borderTop: '0px', paddingBottom: '0px' }}>
            <Card.Header
              className='post-subheader'
              onClick={() => handleOpenLikes(post.likes)}
              style={{ marginBottom: '0', cursor: 'pointer' }}
            >{post.likes.length} likes
            </Card.Header>
          </Card.Content>

          <PostComments post={post} handleEditPost={handleEditPost} style={{ paddingBottom: '0px' }} />

          <Card.Content style={{ borderTop: '0px', paddingTop: '0px' }}>
            <Card.Meta>
              {dateFormatter.timeSince(post.date)} ago
            </Card.Meta>
          </Card.Content>

          <CommentInput post={post} handleEditPost={handleEditPost} />
          <UpdateModal
            index={index}
            showUpdateModal={showUpdateModal[index]}
            oldContent={post.content}
            oldId={post.id}
            handleEditPost={handleEditPost}
            handleCloseModal={handleCloseModal}
          />
          <UserLists open={showLikeModal} handleCloseModal={handleCloseLikeModal} userList={userList} listType='Likes' setUserList={setUserList} />
        </Card>
      ))}
    </div>
  );
};

export default Posts;
