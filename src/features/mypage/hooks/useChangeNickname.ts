import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

export const useChangeNickname = () => {
  const changeNickname = useMutation(
    async (nickname: string) => {
      await user.patch(`/users/nickname`, { nickname });
    },
    {
      onSuccess() {
        alert("수정 완료");
      },
      onError() {
        alert("변경내용을 확인해주세요");
      },
    }
  );

  return { changeNickname };
};
