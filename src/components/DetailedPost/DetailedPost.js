import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import DetailedPostImage from './DetailedPostImage';
import DetailedPostText from './DetailedPostText';
import UserLists from '../UserProfile/UserLists';

const DetailedPost = ({ posts, handleEditPost, handleDeletePost }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [userList, setUserList] = useState([]);

  const handleCloseLikeModal = () => {
    setShowLikeModal(false);
  };

  const handleOpenLikes = (likes) => {
    console.log(likes);
    setUserList(likes);
    setShowLikeModal(true);
  };

  useEffect(() => {
    setPost(posts.find((p) => p.id === id));
  }, [posts]);

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
