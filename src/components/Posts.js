import React, { useState, useEffect } from 'react';
import { Card, Menu } from 'semantic-ui-react';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
// import postService from '../services/posts';
import UpdateModal from './UpdateModal';
import PostMenu from './PostMenu';
import CommentInput from './CommentInput';
import PostTextSection from './PostTextSection';
import PostActions from './PostActions';

const Posts = ({ posts, handleDeletePost, handleEditPost }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [showUpdateModal, setShowUpdateModal] = useState([]);

  useEffect(() => {
    setShowUpdateModal(posts.map(() => false));
  }, [posts]);

  const handleCloseModal = (index) => {
    setShowUpdateModal(showUpdateModal.map((modal, i) => (i === index ? false : modal)));
  };

  const handleOpenModal = (index) => {
    setShowUpdateModal(showUpdateModal.map((modal, i) => (i === index ? true : modal)));
  };

  const userOwnedPost = (post) => {
    if (loggedInUser.username === post.user.username) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {posts.map((post, index) => (
        <Card key={post.id} centered style={{ width: '600px', overflow: 'hidden', marginBottom: '20px' }} header={post.username}>

          <Card.Header className='post-header'>
            <Menu borderless fluid icon>
              <Menu.Item>

                <CloudinaryContext cloudName='huynhstagram'>
                  <Image publicId={post.user.profileImage}>
                    <Transformation
                      width='30'
                      height='30'
                      crop='thumb'
                      radius='max'
                      border='2px_solid_rgb:e8e8e8'
                    />
                  </Image>
                </CloudinaryContext>

              </Menu.Item>
              <Menu.Item style={{ fontWeight: '700', paddingLeft: '0' }}>{post.user.username}</Menu.Item>
              <Menu.Item position='right'></Menu.Item>
              { userOwnedPost(post)
                && <PostActions post={post} index={index} handleOpenModal={handleOpenModal} handleDeletePost={handleDeletePost} />}
            </Menu>
          </Card.Header>

          <Image
            cloudName='huynhstagram'
            publicId={post.imageId}
            width='650'
          />

          <PostMenu post={post} handleEditPost={handleEditPost} />
          <PostTextSection post={post} />
          <CommentInput post={post} handleEditPost={handleEditPost} />
          <UpdateModal
            index={index}
            showUpdateModal={showUpdateModal[index]}
            oldContent={post.content}
            oldId={post.id}
            handleEditPost={handleEditPost}
            handleCloseModal={handleCloseModal}
          />

        </Card>
      ))}
    </div>
  );
};

export default Posts;
