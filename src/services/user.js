import axios from 'axios';
import fileHelper from './fileHelper';

const baseUrl = 'http://localhost:3001/users';

const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const updateProfileImage = async (id, imageFile) => {
  try {
    const fileContents = await fileHelper.readUploadedFileAsText(imageFile);
    const newProfileImage = { profileImage: fileContents };
    const response = await axios.patch(`${baseUrl}/${id}`, newProfileImage);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { register, getUser, updateProfileImage };