import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { removeCookie } from "../../../utils/cookies";
import user from "../../../lib/api/user";

export const useWithdrawal = () => {
  const navigate = useNavigate();
  const withdraw = useMutation({
    mutationFn: async (): Promise<void> => {
      await user.delete(`/users`);
    },
    onSuccess: () => {
      removeCookie("token", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
      removeCookie("expire", { path: "/" });
      navigate("/");
    },
  });

  return { withdraw };
};
