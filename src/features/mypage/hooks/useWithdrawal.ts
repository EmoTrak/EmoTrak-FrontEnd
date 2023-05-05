import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LOGIN_PAGE } from "../../../data/routes/urls";
import { keys } from "../../../data/queryKey/keys";
import user from "../../../lib/api/user";
import { removeCookie } from "../../../utils/cookies";

export const useWithdrawal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const withdraw = useMutation({
    mutationFn: async (): Promise<void> => {
      await user.delete(`/users`);
    },
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: [keys.GET_BOARD, null, null],
      });
      removeCookie("token", { path: "/" });
      removeCookie("refreshToken", { path: "/" });
      removeCookie("expire", { path: "/" });
      navigate(LOGIN_PAGE);
    },
  });

  return { withdraw };
};
