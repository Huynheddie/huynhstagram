import React, { useEffect, useState } from 'react';
import { Grid, Loader, Dimmer } from 'semantic-ui-react';
import Posts from './Posts';
import userService from '../services/user';
import postService from '../services/posts';
import SuggestedUsers from './SuggestedUsers';
import ZeroPosts from './ZeroPosts';
import postHelper from '../utils/postHelper';

const Home = () => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [posts, setPosts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const getAllUsers = async () => {
      let response = await userService.getAllUsers();
      response = response.filter((user) => user.followers.findIndex((follower) => follower.id === loggedInUser.id) === -1 && user.id !== loggedInUser.id);
      console.log('Users:', response);
      setUsers(postHelper.shuffle(response).slice(0, 5));
      response = await userService.getUser(loggedInUser.id);
      setCurrentUser(response);
    };

    getAllUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const getAllPosts = async () => {
        setPageLoading(true);
        const allPosts = await postService.getAllPosts();
        setPosts(allPosts
          .filter((post) => post.user.id === currentUser.id || currentUser.following.findIndex((person) => person.id === post.user.id) !== -1));
        setPageLoading(false);
      };
      getAllPosts();
    }
  }, [currentUser]);

  useEffect(() => {
    if (posts.length > 0) {
      console.log('Posts:', posts);
    }

    if (currentUser) {
      setPageLoading(false);
    }
  }, [posts]);

  const handleEditPost = (oldId, newPost) => {
    setPosts(posts.map((post) => (post.id === oldId ? newPost : post)));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <Grid columns='2' centered>
      {!pageLoading && (
      <Grid.Row>
        <Grid.Column width={posts.length === 0 ? '6' : '10'}>
          { posts.length === 0 && currentUser
            && <ZeroPosts pageLoading={pageLoading} />}
          <Posts
            pageLoading={pageLoading}
            posts={posts}
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
          />
        </Grid.Column>
        <Grid.Column width='2' />
        { users.length > 0 && currentUser && loggedInUser
          && (
          <SuggestedUsers
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setUsers={setUsers}
            users={users.filter((user) => user.id !== loggedInUser.id)}
          />
          )}
      </Grid.Row>
      )}
      {pageLoading && (
        <>
          <Dimmer active inverted>
            <Loader inverted size='huge' />
          </Dimmer>
        </>
      )}
    </Grid>
  );
};

export default Home;
