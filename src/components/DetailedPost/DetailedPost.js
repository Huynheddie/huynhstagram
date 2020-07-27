import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import DetailedPostImage from './DetailedPostImage';
import DetailedPostText from './DetailedPostText';

const DetailedPost = ({ posts, handleEditPost, handleDeletePost }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

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
            />

          </Grid.Row>
        </Grid>
      )}
    </>
  );
};

export default DetailedPost;
