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
      alert("사용가능한 닉네임입니다.");
      setNicknameValidation(true);
    },
    onError: () => {
      alert("중복된 닉네임입니다. 다른 닉네임을 입력해주세요.");
      setNicknameValidation(false);
    },
  });

  return {
    validNickname,
    checkNickname,
    nicknameValidation,
    setNicknameValidation,
  };
};
