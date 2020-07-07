import React, { useEffect, useState } from 'react';
import './Home.scss';
import NavMenu from './components/NavMenu';
// import ReduxStuff from './components/ReduxStuff';
import postService from './services/posts';
import Posts from './components/Posts';
import CreatePostCard from './components/CreatePostCard';

const App = () => {
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
      <NavMenu />
      <div style={{ paddingTop: '100px' }}>
        <CreatePostCard handleNewPost={handleNewPost} />
        <Posts posts={posts} handleDeletePost={handleDeletePost} handleEditPost={handleEditPost} />
      </div>

      {/* <ReduxStuff /> */}

    </div>
  );
};

export default App;
