import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentType } from "../../../data/type/type";
import user from "../../../lib/api/user";
import { keys } from "../../../data/queryKey/keys";

const useAddComment = (id: number | undefined) => {
  const queryClient = useQueryClient();

  const { mutate: addComment } = useMutation({
    mutationFn: async (payload: CommentType) => {
      await user.post(`/boards/${id}/comments`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([keys.GET_BOARD_DETAIL]);
    },
  });

  return { addComment };
};

export default useAddComment;
