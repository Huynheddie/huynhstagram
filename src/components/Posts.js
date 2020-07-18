import React, { useState, useEffect } from 'react';
import { Card, Menu } from 'semantic-ui-react';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
// import postService from '../services/posts';
import UpdateModal from './UpdateModal';
import PostMenu from './PostMenu';
import CommentInput from './CommentInput';
import PostTextSection from './PostTextSection';
import PostActions from './PostActions';
import dateFormatter from '../utils/dateFormatter';
import { Link } from 'react-router-dom';

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
        <Card key={post.id} centered style={{ width: '600px', overflow: 'hidden', marginBottom: '20px' }}>

          <Card.Header className='post-header'>
            <Menu borderless fluid icon style={{ borderRadius: '0' }}>
              <Menu.Item>

                <CloudinaryContext cloudName='huynhstagram'>
                  <Image publicId={post.user.profileImage}>
                    <Transformation
                      width='30'
                      height='30'
                      crop='thumb'
                      radius='max'
                    />
                  </Image>
                </CloudinaryContext>

              </Menu.Item>
              <Menu.Item style={{ fontWeight: '700', paddingLeft: '0' }}>
                <Link to={`/user/${post.user.id}`} style={{color: 'black'}}>
                  {post.user.username}
                </Link>
              </Menu.Item>
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

          <Card.Content style={{ borderTop: '0px', paddingBottom: '0px' }}>
            <Card.Header className='post-subheader' style={{ marginBottom: '0' }}>{post.likes.length} likes</Card.Header>
          </Card.Content>

          <PostTextSection post={post} handleEditPost={handleEditPost} style={{ paddingBottom: '0px' }} />

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

        </Card>
      ))}
    </div>
  );
};

export default Posts;
