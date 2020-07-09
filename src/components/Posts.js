import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Image } from 'cloudinary-react';
import postService from '../services/posts';
import UpdateModal from './UpdateModal';
import PostMenu from './PostMenu';

const Posts = ({ posts, handleDeletePost, handleEditPost }) => {
  const handleDelete = async (id) => {
    await postService.deletePost(id);
    handleDeletePost(id);
  };

  const userOwnedPost = (post) => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (currentUser.username === post.user.username) {
      return true;
    }
    return false;
  };

  const getFormattedDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${(date.getMonth() > 8) ? (date.getMonth() + 1) : (`0${date.getMonth() + 1}`)}/${(date.getDate() > 9) ? date.getDate() : (`0${date.getDate()}`)}/${date.getFullYear()}`;
  };

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} centered style={{ width: '600px', overflow: 'hidden', marginBottom: '20px' }} header={post.username}>
          <Card.Header className='post-header'> {post.user.username} </Card.Header>
          <Image
            cloudName='huynhstagram'
            publicId={post.imageId}
            width='650'
          />

          <PostMenu />

          <Card.Content style={{ borderTop: 'none' }}>
            <Card.Header> {post.user.username} </Card.Header>

            <Card.Description style={{ fontSize: '1.28571429em', marginBottom: '.5em' }}>
              {post.content}
            </Card.Description>

            <Card.Meta>
              {getFormattedDate(post.date)}
            </Card.Meta>

          </Card.Content>

          <Card.Content>
            Add a comment...
          </Card.Content>

          { userOwnedPost(post)
            && (
            <Card.Content textAlign='right'>
              <UpdateModal oldContent={post.content} oldId={post.id} handleEditPost={handleEditPost} />
              <Button color='red' onClick={() => handleDelete(post.id)}>Remove</Button>
            </Card.Content>
            )}

        </Card>
      ))}
    </div>
  );
};

export default Posts;
