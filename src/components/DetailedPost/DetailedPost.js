import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import DetailedPostImage from './DetailedPostImage';
import DetailedPostText from './DetailedPostText';
import UserLists from '../UserProfile/UserLists';
import postService from '../../services/posts';

const DetailedPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const history = useHistory();

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
  };

  const handleEditPost = (updatedPost) => {
    setPost(updatedPost);
  };

  const handleDeletePost = (deletePost) => {
    console.log('Request to delete post:', deletePost);
    history.push('/');
  };

  const handleOpenLikes = (likes) => {
    console.log(likes);
    setUserList(likes);
    setShowLikeModal(true);
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await postService.getSpecificPost(id);
      console.log(response);
      setPost(response);
    };
    getPost();
  }, []);

  return (
    <>
      { post && (
      <Grid columns='2' centered>
        <Grid.Row>

          <DetailedPostImage post={post} />
          <DetailedPostText
            post={post}
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
            handleOpenLikes={handleOpenLikes}
          />

        </Grid.Row>
        <UserLists open={showLikeModal} handleCloseModal={handleCloseLikeModal} userList={userList} listType='Likes' setUserList={setUserList} />

      </Grid>

      )}
    </>
  );
};

export default DetailedPost;
