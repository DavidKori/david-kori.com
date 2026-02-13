import axios from 'axios';

const instance = axios.create({
  // baseURL:'http://localhost:5000/api',
  baseURL: 'https://portfolio-backend-xvu9.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;

