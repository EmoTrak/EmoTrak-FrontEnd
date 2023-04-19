import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

export const useChangePassword = () => {
  const changePassword = useMutation(
    async (item: string) => {
      const data = await user.patch(`/users/password`, { password: item });
      return data;
    },
    {
      onSuccess(data) {
        alert("수정 완료");
      },
      onError(error) {
        alert("변경내용을 확인해주세요");
      },
    }
  );

  return { changePassword };
};
