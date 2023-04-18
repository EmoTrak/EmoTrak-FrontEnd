import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../../utils/cookies";

const user = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  // timeout: 1,
  // 오류 확인 가능한지 테스트.. 1밀리세컨드.. 내에 응답을 못받으면 에러처리 하도록 돼 있음.
  // 쿼리에서 처리하기
});

user.interceptors.request.use(
  // 요청을 보내기 전 수행되는 함수
  function (config) {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  // 오류 요청을 내보내기 전 수행되는 함수
  function (error) {
    return Promise.reject(error);
  }
);

user.interceptors.response.use(
  // 응답을 내보내기 전 수행되는 함수
  function (response) {
    return response;
  },

  // 오류 응답을 내보내기 전 수행되는 함수
  async function (error) {
    const originalConfig = error.config;
    try {
      const refreshToken = getCookie("refreshToken");
      const expire = getCookie("expire");

      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/refresh-token`,
        null,
        {
          headers: {
            "Refresh-Token": `${refreshToken}`,
            "Access-Token-Expire-Time": `${expire}`,
          },
        }
      );

      const newInfo = data.headers["authorization"];
      const newToken = newInfo.split(" ")[1];
      removeCookie("token", { path: "/" });
      setCookie("token", newToken, { path: "/", maxAge: 1740 });

      return user.request(originalConfig);
    } catch (error) {
      // 이부분 이후 수정 예정
      // removeCookie("refreshToken", { path: "/" });
      // removeCookie("token", { path: "/" });
      // removeCookie("expire", { path: "/" });
      alert("다시 로그인해주세요!");
    }

    // return Promise.reject(error);
  }
);

export default user;
