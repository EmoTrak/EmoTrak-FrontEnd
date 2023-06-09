import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

export const useChangePassword = () => {
  const changePassword = useMutation({
    mutationFn: async (password: string) => {
      await user.patch(`/users/password`, { password });
    },
    onSuccess() {
      alert("수정되었습니다.");
    },
  });

  return { changePassword };
};
