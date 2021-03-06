import axios from 'axios';
import fileHelper from './fileHelper';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/users' : 'https://huynhstagram-backend.herokuapp.com/users';

const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(`${baseUrl}`);
  return response.data;
};

const updateProfileImage = async (id, imageFile) => {
  try {
    const fileContents = await fileHelper.readUploadedFileAsText(imageFile);
    const newProfileImage = { profileImage: fileContents };
    const response = await axios.patch(`${baseUrl}/profileimage/${id}`, newProfileImage);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateBiography = async (id, newBio) => {
  const response = await axios.patch(`${baseUrl}/biography/${id}`, { newBio });
  return response.data;
};

const followOtherUser = async (currentUserId, targetUserId) => {
  const response = await axios.patch(`${baseUrl}/followUser`, { currentUserId, targetUserId });
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${baseUrl}/${userId}`);
  return response.data;
};

const searchUsers = async (username) => {
  const response = await axios.get(`${baseUrl}/search/${username}`);
  return response.data;
};

export default { register, getUser, getAllUsers, updateProfileImage, updateBiography, followOtherUser, deleteUser, searchUsers };
