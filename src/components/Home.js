import React, { useEffect, useState } from 'react';
import postService from '../services/posts';
import Posts from './Posts';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      const allPosts = await postService.getAllPosts();
      console.log(allPosts);
      setPosts(allPosts);
    };

    getAllPosts();
  }, []);

  const handleNewPost = (newPost) => {
    setPosts(posts.concat(newPost));
  };

  const handleEditPost = (oldId, newPost) => {
    setPosts(posts.map((post) => (post.id === oldId ? newPost : post)));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div>
      <Posts
        posts={posts}
        handleNewPost={handleNewPost}
        handleEditPost={handleEditPost}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default Home;
