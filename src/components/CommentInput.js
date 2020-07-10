import React, { useState } from 'react';
import postService from '../services/posts';

const CommentInput = ({ post, handleEditPost }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [comment, setComment] = useState('');

  const addComment = async (postId, comments, newComment) => {
    comments.push(newComment);
    const response = await postService.patchPost(postId, { comments });
    if (response) {
      handleEditPost(postId, response);
    }
  };

  const handleComment = async (event, postId, comments) => {
    event.preventDefault();
    const newComment = { username: loggedInUser.username, comment };
    addComment(postId, comments, newComment);
  };

  return (
    <div>
      <form onSubmit={(e) => {
        handleComment(e, post.id, post.comments);
        setComment('');
      }}
      >
        <input
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          placeholder='Add a comment...'
          className='post-comment'
        />
      </form>
    </div>
  );
};

export default CommentInput;
