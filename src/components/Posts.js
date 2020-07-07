import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';
import postService from '../services/posts';
import UpdateModal from './UpdateModal';

const Posts = ({ posts, handleDeletePost, handleEditPost }) => {
  const handleDelete = async (id) => {
    await postService.deletePost(id);
    handleDeletePost(id);
  };

  const getFormattedDate = (rawDate) => {
    const date = new Date(rawDate);
    return `${(date.getMonth() > 8) ? (date.getMonth() + 1) : (`0${date.getMonth() + 1}`)}/${(date.getDate() > 9) ? date.getDate() : (`0${date.getDate()}`)}/${date.getFullYear()}`;
  };

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} centered style={{ width: '600px', overflow: 'hidden', marginBottom: '20px' }} header={post.username}>
          <Image
            style={{ padding: '0px' }}
            src='https://c4.wallpaperflare.com/wallpaper/444/553/202/digital-art-artwork-anime-anime-boys-wallpaper-preview.jpg'
          />
          <Card.Content>
            <Card.Header> {post.userName} </Card.Header>

            <Card.Meta>
              {getFormattedDate(post.date)}
            </Card.Meta>
            <Card.Description style={{ fontSize: '25px', marginBottom: '.5em' }}>
              {post.content}
            </Card.Description>

            <UpdateModal oldUserName={post.userName} oldContent={post.content} oldId={post.id} handleEditPost={handleEditPost} />

            <Button color='red' onClick={() => handleDelete(post.id)}>Remove</Button>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
