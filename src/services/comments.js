import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/comments' : 'https://huynhstagram-backend.herokuapp.com/comments';

const createComment = async (newComment, postId) => {
  const response = await axios.post(`${baseUrl}/${postId}`, newComment);
  return response.data;
};

const addLike = async (userId, postId, commentId) => {
  const response = await axios.patch(`${baseUrl}/like/${postId}`, { userId, commentId });
  return response.data;
};

const removeLike = async (userId, postId, commentId) => {
  const response = await axios.patch(`${baseUrl}/dislike/${postId}`, { userId, commentId });
  return response.data;
};

const removeComment = async (postId, commentId) => {
  const response = await axios.patch(`${baseUrl}/remove`, { postId, commentId });
  return response.data;
};

export default {
  createComment,
  addLike,
  removeLike,
  removeComment,
};
