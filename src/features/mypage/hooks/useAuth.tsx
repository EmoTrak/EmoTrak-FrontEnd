import { useMutation, useQuery } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { useCallback, useState } from "react";
import { keys } from "../../../data/queryKeys/keys";

interface MyInfo {
  email: string;
  nickname: string;
  hasSocial: boolean;
}

export const useAuth = () => {
  const [userInfo, setUserInfo] = useState<MyInfo>({
    email: "",
    nickname: "",
    hasSocial: false,
  });

  // const getUserInfo = useCallback(async () => {
  //   const data = await user.get(`/users/mypage`);
  //   return data;
  // }, []);

  const { data, isLoading } = useQuery(
    [`${keys.GET_USER}`],
    async () => {
      const data = await user.get(`/users/mypage`);
      return data;
    },
    {
      onSuccess(data) {
        const queryInfo = data?.data.data;

        setUserInfo(queryInfo);
      },
    }
  );
  // const authorization = useMutation(
  //   async (item: string | undefined) => {
  //     const data = await user.post(`/users/mypage`, item);
  //     return data;
  //   },
  //   {
  //     onSuccess(data) {
  //       const info: MyInfo = data.data;
  //       setUserInfo(info);
  //       action(true);
  //     },
  //     onError(error) {
  //       alert("비밀번호를 확인해주세요");
  //       action(false);
  //     },
  //   }
  // );

  return { data, userInfo, isLoading };
};
