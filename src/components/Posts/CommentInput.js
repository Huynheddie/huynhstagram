import React, { useState, useRef, useEffect } from 'react';
import commentService from '../../services/comments';

const CommentInput = ({ isDetailedPage, post, handleEditPost, focus }) => {
  const loggedInUser = JSON.parse(window.localStorage.getItem('loggedInUser'));
  const [comment, setComment] = useState('');
  const inputRef = useRef(null);
  const maxLength = 100;

  useEffect(() => {
    if (focus > 0) {
      inputRef.current.focus();
    }
  }, [focus]);

  const addComment = async (newComment, postId) => {
    const response = await commentService.createComment(newComment, postId);
    if (response) {
      if (isDetailedPage) {
        handleEditPost(response);
      } else {
        handleEditPost(postId, response);
      }
    }
  };

  const handleComment = async (event, postId) => {
    event.preventDefault();
    const newComment = {
      user: loggedInUser.id, comment, likes: [], date: new Date(),
    };
    addComment(newComment, postId);
  };

  const handleChangeInput = async (event) => {
    event.preventDefault();
    setComment(event.target.value.slice(0, maxLength));
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
          onChange={handleChangeInput}
          placeholder='Add a comment...'
          className='post-comment'
        />
      </form>
    </div>
  );
};

export default CommentInput;
