import { useMutation, useQueryClient } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { keys } from "../../../data/queryKeys/keys";

const useUpdateComment = (editComment: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate: updateComment } = useMutation({
    mutationFn: async (id: number) => {
      await user.patch(`/boards/comments/${id}`, { comment: editComment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([keys.GET_BOARD]);
    },
  });

  return { updateComment };
};

export default useUpdateComment;
