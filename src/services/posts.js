import axios from 'axios';

const baseUrl = 'http://localhost:3001/posts';

const getAllPosts = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getSpecificPost = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const createPost = async (newPost) => {
  const request = await axios.post(baseUrl, newPost);
  return request.data;
};

const updatePost = async (id, newPost) => {
  const request = await axios.put(`${baseUrl}/${id}`, newPost, { new: true });
  return request.data;
};

const deletePost = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`);
  return request.data;
};

export default {
  getAllPosts,
  getSpecificPost,
  createPost,
  updatePost,
  deletePost,
};
