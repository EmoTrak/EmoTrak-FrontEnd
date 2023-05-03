import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

export const useChangeNickname = () => {
  const changeNickname = useMutation(
    async (nickname: string) => {
      await user.patch(`/users/nickname`, { nickname });
    },
    {
      onSuccess() {
        window.confirm("정말 변경하시겠습니까?") && alert('수정완료');
      },
    }
  );

  return { changeNickname };
};
