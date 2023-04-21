import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../../utils/cookies";
import guest from "./guest";

const user = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

user.interceptors.request.use(
  function (config) {
    const token = getCookie("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

user.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error) {
    console.log("error =", error);

    const originalConfig = error.config;
    const statusCode: number = error.response.data.statusCode;
    const errorCode: string = error.response.data.errorCode;
    if (statusCode === 401) {
      switch (errorCode) {
        case "x-1001":
          return alert("다시 로그인해주세요.");
        case "x-1002":
          const refreshToken = getCookie("refreshToken");
          const expire = getCookie("expire");
          if (refreshToken && expire) {
            const data = await guest.post(`/users/refresh-token`, null, {
              headers: {
                "Refresh-Token": `${refreshToken}`,
                "Access-Token-Expire-Time": `${expire}`,
              },
            });

            const newInfo = data.headers["authorization"];
            const newToken = newInfo.split(" ")[1];
            removeCookie("token", { path: "/" });
            setCookie("token", newToken, { path: "/", maxAge: 1740 });

            return user.request(originalConfig);
          }
          return alert("다시 로그인해주세요.");
        case "x-1003":
          return alert("다시 로그인해주세요.");
        case "x-1004":
          return alert("작성자만 수정/삭제가 가능합니다.");
        case "x-1005":
          return alert("본인의 게시물만 조회할 수 있습니다.");
        case "x-1006":
          return alert("다시 로그인해주세요.");
        case "x-1007":
          return alert("소셜 계정 연동 해제에 실패했습니다.");
        default:
          return Promise.reject(error);
      }
    } else if (statusCode === 404) {
      return alert("삭제된 게시물입니다.");
    }

    return Promise.reject(error);
  }
);

export default user;
