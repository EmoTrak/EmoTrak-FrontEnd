import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "../../../data/queryKey/keys";
import user from "../../../lib/api/user";

export const useReport = (uri: string | undefined) => {
  const [reason, setReason] = useState("");

  const changeInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };
  const queryClient = useQueryClient();
  const { mutate, status, reset } = useMutation({
    mutationFn: async (id: number | undefined) => {
      const data = await user.post(`/boards/${uri}/${id}`, { reason });
      return data;
    },
    onSuccess: () => {
      setReason("");
      queryClient.invalidateQueries([keys.GET_BOARD]);
    },
  });

  return { reason, changeInputHandler, mutate, status, reset };
};
