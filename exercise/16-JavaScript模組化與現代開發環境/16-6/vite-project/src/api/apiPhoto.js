// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

const request = axios.create({
  baseURL: 'https://vue-lessons-api.vercel.app/',
});
// eslint-disable-next-line import/prefer-default-export
export const apiGetPhddotoList = () => request.get('/photo/list');
