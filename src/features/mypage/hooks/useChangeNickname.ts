import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

export const useChangeNickname = () => {
  const changeNickname = useMutation(
    async (nickname: string) => {
      await user.patch(`/users/nickname`, { nickname });
    },
    {
      onSuccess() {
        alert("수정되었습니다.");
      },
    }
  );

  return { changeNickname };
};
