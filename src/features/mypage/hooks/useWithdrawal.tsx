import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCookie } from "../../../utils/cookies";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";

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
      navigate("/");
    },
  });

  return { withdraw };
};
