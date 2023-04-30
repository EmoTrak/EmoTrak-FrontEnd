// import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../utils/cookies";
import user from "../lib/api/user";
import { logout } from "../utils/logout";

export const useError = (responseError: any): any => {
  const originalConfig = responseError.config;
  const statusCode: number = responseError.response.data.statusCode;
  const errorCode: string = responseError.response.data.errorCode;

  const BAD_REQUEST = new Map([
    ["x-1005", () => alert("등록된 사용자가 없습니다.")],
    ["x-1006", () => alert("비밀번호가 일치하지 않습니다.")],
    ["x-1007", () => alert("정보를 확인해주세요.")],
    ["x-1008", () => alert("파일 업로드 중 에러가 발생했습니다.")],
    ["x-1010", () => alert("파일 삭제 중 에러가 발생했습니다.")],
    ["x-1011", () => alert("3회 이상의 신고로 공유가 중지된 글입니다.")],
    ["x-1013", () => alert("잠시 후 다시 시도해주세요.")],
    ["x-1014", () => alert("잠시 후 다시 시도해주세요.")],
    ["x-1015", () => alert("지원하지 않는 파일 형식입니다.")],
    ["x-1016", () => alert("5mb이하의 파일만 업로드할 수 있습니다.")],
  ]);

  const UNAUTHORIZED = new Map([
    [
      "x-1001",
      () => {
        alert("다시 로그인해주세요");
        logout();
      },
    ],
    [
      "x-1002",
      async () => {
        const refreshToken = getCookie("refreshToken");
        const expire = getCookie("expire");
        if (refreshToken && expire) {
          const data = await user.post(`/users/refresh-token`, null, {
            headers: {
              "Refresh-Token": `${refreshToken}`,
              "Access-Token-Expire-Time": `${expire}`,
            },
          });

          const newInfo = data.headers["authorization"];
          const newExpire = data.headers["access-token-expire-time"];
          const newToken = newInfo.split(" ")[1];
          // logout();
          setCookie("token", newToken, { path: "/", maxAge: 1740 });
          setCookie("expire", newExpire, { path: "/", maxAge: 604800 });

          return user.request(originalConfig);
        }
      },
    ],
    [
      "x-1003",
      () => {
        alert("다시 로그인해주세요");
        logout();
      },
    ],
    ["x-1004", () => alert("본인의 게시물만 수정/삭제가 가능합니다.")],
    ["x-1005", () => alert("권한이 없습니다.")],
    [
      "x-1006",
      () => {
        alert("다시 로그인해주세요");
        logout();
      },
    ],
    ["x-1007", () => alert("다시 로그인해주세요.")],
  ]);

  const FORBIDDEN = new Map([["x-1001", () => alert("권한이 없습니다.")]]);

  const NOT_FOUND = new Map([
    ["x-1001", () => alert("선택한 게시물을 찾을 수 없습니다.")],
    ["x-1002", () => alert("선택한 댓글을 찾을 수 없습니다.")],
    ["x-1003", () => alert("찾을 수 없는 일기입니다.")],
    ["x-1004", () => alert("신고내역을 찾을 수 없습니다.")],
  ]);
  const CONFLICT = new Map([
    ["x-1001", () => alert("중복된 이메일이 존재합니다.")],
    ["x-1002", () => alert("중복된 닉네임이 존재합니다.")],
    ["x-1003", () => alert("이미 신고된 내역이 존재합니다.")],
    ["x-1004", () => alert("패스워드가 동일합니다.")],
    ["x-1005", () => alert("닉네임이 동일합니다.")],
  ]);

  const errors = new Map([
    [400, BAD_REQUEST],
    [401, UNAUTHORIZED],
    [403, FORBIDDEN],
    [404, NOT_FOUND],
    [409, CONFLICT],
  ]);

  const errorFunc = errors.get(statusCode)?.get(errorCode);

  return errorFunc && errorFunc();
};
