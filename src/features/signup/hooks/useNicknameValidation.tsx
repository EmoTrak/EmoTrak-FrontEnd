import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

export const useNicknameValidation = () => {
  const [nicknameValidation, setNicknameValidation] = useState<boolean>(false);
  const validNickname = (item: string): boolean =>
    /^[ㄱ-ㅎ|가-힣|a-z|A-Z|\d$@!%*#?&()^]{1,8}$/.test(item);

  const checkNickname = useMutation({
    mutationFn: async (nickname: string) => {
      const data = await user.post(`/users/nick-check`, { nickname });
      return data;
    },
    onSuccess: () => {
      setNicknameValidation(true);
    },
  });

  return {
    validNickname,
    checkNickname,
    nicknameValidation,
    setNicknameValidation,
  };
};
