import React, { useState, useRef, useEffect } from 'react';
import commentService from '../../services/comments';

const CommentInput = ({ post, handleEditPost, focus }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [comment, setComment] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (focus > 0) {
      inputRef.current.focus();
    }
  }, [focus]);

  const addComment = async (newComment, postId) => {
    const response = await commentService.createComment(newComment, postId);
    if (response) {
      handleEditPost(response);
    }
  };

  const handleComment = async (event, postId) => {
    event.preventDefault();
    const newComment = {
      user: loggedInUser.id, comment, likes: [], date: new Date(),
    };
    addComment(newComment, postId);
  };

  return (
    <div>
      <form onSubmit={(e) => {
        handleComment(e, post.id);
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
