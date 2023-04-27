import { useMutation, useQueryClient } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { keys } from "../../../data/queryKeys/keys";

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: async (id: number | undefined) => {
      await user.delete(`/boards/comments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([keys.GET_BOARD_DETAIL]);
    },
  });
  return { deleteComment };
};

export default useDeleteComment;
