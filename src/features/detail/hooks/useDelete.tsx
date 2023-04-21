import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

export const useDelete = () => {
  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      await user.delete(`/daily/${id}`);
    },
  });

  return { deletePost };
};
