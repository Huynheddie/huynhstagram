import React, { useState } from 'react';
import { Grid, Card } from 'semantic-ui-react';
import PostComments from '../Posts/PostComments';
import PostInteractions from '../Posts/PostInteractions';
import CommentInput from '../Posts/CommentInput';
import PostHeader from '../Posts/PostHeader';
import UpdateModal from '../Posts/UpdateModal';
import DetailedPostDetail from './DetailedPostDetail';

const DetailedPostText = ({ post, handleEditPost, handleDeletePost }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [inputFocus, setInputFocus] = useState(0);

  const handleOpenModal = () => {
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <Grid.Column width='4' className='detailed-post-text-column'>

      <Card style={{ height: '100%', borderRadius: '0px' }}>
        <PostHeader post={post} isDetailedPage handleOpenModal={handleOpenModal} handleDeletePost={handleDeletePost} />

        <PostComments post={post} isDetailedPage handleEditPost={handleEditPost} />

        <div style={{ borderTop: '1px solid rgba(138, 138, 138, 0.15)' }}>
          <PostInteractions post={post} handleEditPost={handleEditPost} focus={inputFocus} setInputFocus={setInputFocus} />
        </div>

        <DetailedPostDetail post={post} />

        <CommentInput post={post} handleEditPost={handleEditPost} focus={inputFocus} />

        <UpdateModal
          isDetailedPage
          showUpdateModal={showUpdateModal}
          oldContent={post.content}
          oldId={post.id}
          handleEditPost={handleEditPost}
          handleCloseModal={handleCloseModal}
        />
      </Card>

    </Grid.Column>
  );
};

export default DetailedPostText;
