import axios from 'axios';
import { getCookie } from '../../utils/cookies';

const user = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  // timeout: 1,
  // 오류 확인 가능한지 테스트.. 1밀리세컨드.. 내에 응답을 못받으면 에러처리 하도록 돼 있음.
  // 쿼리에서 처리하기
});

user.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    const token = getCookie('token');
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }
);

user.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    return response;
  },

  // 오류 응답을 내보내기 전 수행되는 함수
  function (error) {
    return Promise.reject(error);
  }
);

export default user;
