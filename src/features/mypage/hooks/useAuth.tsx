import { useQuery } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { useState } from "react";
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


  return { data, userInfo, isLoading };
};
