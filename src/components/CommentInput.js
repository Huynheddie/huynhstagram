import React, { useState, useRef, useEffect } from 'react';
import postService from '../services/posts';

const CommentInput = ({ post, handleEditPost, focus }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [comment, setComment] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (focus > 0) {
      inputRef.current.focus();
    }
  }, [focus]);

  const addComment = async (postId, comments, newComment) => {
    comments.push(newComment);
    const response = await postService.patchPost(postId, { comments });
    if (response) {
      handleEditPost(postId, response);
    }
  };

  const handleComment = async (event, postId, comments) => {
    event.preventDefault();
    const newComment = {
      username: loggedInUser.username, userId: loggedInUser.id, comment, likes: [], profileImage: loggedInUser.profileImage, date: new Date(),
    };
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
          ref={inputRef}
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
