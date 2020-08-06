import React, { useEffect, useState } from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import commentService from '../../services/comments';
import PostContent from './PostContent';
import Comment from './Comment';

const PostComments = ({ post, isDetailedPage, handleEditPost }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [likeLoading, setLikeLoading] = useState(false);

  const handleCommentLike = async (postId, comment, likes) => {
    setLikeLoading(true);
    let response = null;
    if (likes.findIndex((like) => like.id === loggedInUser.id) === -1) {
      response = await commentService.addLike(loggedInUser.id, postId, comment._id);
    } else {
      response = await commentService.removeLike(loggedInUser.id, postId, comment._id);
    }
    console.log(response);
    if (isDetailedPage) {
      handleEditPost(response);
    } else {
      handleEditPost(postId, response);
    }
    setLikeLoading(false);
  };

  return (
    <Card.Content className={isDetailedPage ? 'detailed-comment-content' : 'post-comment-content'} style={{ borderTop: 'none', paddingLeft: '16px' }}>

      <div style={{ display: 'grid' }}>

        <PostContent post={post} isDetailedPage={isDetailedPage} />

        { isDetailedPage && post.comments.map((comment, index) => (
          <Comment
            comment={comment}
            post={post}
            isDetailedPage={isDetailedPage}
            index={index}
            handleCommentLike={handleCommentLike}
            handleEditPost={handleEditPost}
            key={index}
            likeLoading={likeLoading}
          />
        ))}

        {!isDetailedPage && post.comments.length < 4 && post.comments.map((comment, index) => (
          <Comment
            comment={comment}
            post={post}
            isDetailedPage={isDetailedPage}
            index={index}
            handleCommentLike={handleCommentLike}
            handleEditPost={handleEditPost}
            key={index}
            likeLoading={likeLoading}
          />
        ))}

        {!isDetailedPage && post.comments.length >= 4 && post.comments.slice(0, 2).map((comment, index) => (
          <Comment
            comment={comment}
            post={post}
            isDetailedPage={isDetailedPage}
            index={index}
            handleCommentLike={handleCommentLike}
            handleEditPost={handleEditPost}
            key={index}
            likeLoading={likeLoading}
          />
        ))}

        { !isDetailedPage && post.comments.length >= 4 && (
        <Link to={`/post/${post.id}`} style={{ color: '#8e8e8e', fontSize: '14px' }}>
          <p>View all {post.comments.length} comments</p>
        </Link>
        )}

      </div>

    </Card.Content>
  );
};

export default PostComments;
