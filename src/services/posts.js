import axios from 'axios';
import fileHelper from './fileHelper';

const baseUrl = 'http://localhost:3001/posts';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAllPosts = async () => {
  const response = await axios.get(baseUrl);
  return response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getPostsByUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/byUser/${userId}`);
  return JSON.parse(response.data).sort((a, b) => new Date(b.date) - new Date(a.date));
};

const getSpecificPost = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createPost = async (newPost, imageFile) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const fileContents = await fileHelper.readUploadedFileAsText(imageFile);
    const completeNewPost = { ...newPost, imageText: fileContents };
    const response = await axios.post(baseUrl, completeNewPost, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (id, newPost) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newPost, config);
  return response.data;
};

const patchPost = async (id, newPost) => {
  const response = await axios.patch(`${baseUrl}/${id}`, newPost);
  return response.data;
};

const modifyLike = async (postId, userId) => {
  const response = await axios.patch(`${baseUrl}/like/${postId}`, { userId });
  return response.data;
};

const deletePost = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default {
  getAllPosts,
  getPostsByUser,
  getSpecificPost,
  createPost,
  updatePost,
  patchPost,
  modifyLike,
  deletePost,
  setToken,
};
