import React from 'react';
import Posts from './Posts';

const Home = ({ posts, handleNewPost, handleEditPost, handleDeletePost }) => (
  <div>
    <Posts
      posts={posts}
      handleNewPost={handleNewPost}
      handleEditPost={handleEditPost}
      handleDeletePost={handleDeletePost}
    />
  </div>
);

export default Home;
