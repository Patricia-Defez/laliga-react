import axios from 'axios';

const http = axios.create({
    baseURL: 'https://reqres.in',
    withCredentials: false
});
http.interceptors.response.use(
    response => response,
    error => {
      console.error(error);
      if (error.status === 403) {
        window.location = '/login';
      } else {
        return Promise.reject(error);
      }
    }
  )

export default http;