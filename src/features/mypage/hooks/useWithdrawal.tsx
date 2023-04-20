import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import user from "../../../lib/api/user";
import { removeCookie } from "../../../utils/cookies";

export const useWithdrawal = () => {
  const navigate = useNavigate();
  const withdraw = useMutation(
    async (): Promise<void> => {
      await user.delete(`/users`);
    },
    {
      onSuccess() {
        removeCookie("token");
        alert("탈퇴되었습니다!");
        navigate('/');
      },
      onError() {},
    }
  );

  return { withdraw };
};
