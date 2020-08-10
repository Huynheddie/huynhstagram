import React, { useEffect, useState } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
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
  const [pageLoading, setPageLoading] = useState(true);
  const history = useHistory();

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
  };

  const handleEditPost = (updatedPost) => {
    setPost(updatedPost);
  };

  const handleDeletePost = (deletePost) => {
    history.push('/');
  };

  const handleOpenLikes = (likes) => {
    setUserList(likes);
    setShowLikeModal(true);
  };

  useEffect(() => {
    const getPost = async () => {
      const response = await postService.getSpecificPost(id);
      setPost(response);
      setPageLoading(false);
    };
    getPost();
  }, []);

  return (
    <>
      { !pageLoading && post && (
      <Grid columns='2' centered>
        <Grid.Row className='grid-row'>

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

      {pageLoading && (
      <>
        <Dimmer active inverted>
          <Loader inverted size='huge' />
        </Dimmer>
      </>
      )}
    </>
  );
};

export default DetailedPost;
