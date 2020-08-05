import axios from 'axios';

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/login' : 'https://huynhstagram-backend.herokuapp.com/login';

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
