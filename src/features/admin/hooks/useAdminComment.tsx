import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";

const useAdminComment = (page: number) => {
  const queryClient = useQueryClient();

  const { data, status, isError } = useQuery({
    queryKey: [keys.GET_ADMIN, page],
    queryFn: async () => {
      const { data } = await user.get("/admin/comments", { params: { page } });
      return data.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (payload: number) => {
      await user.delete(`/boards/comments/${payload}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.GET_ADMIN] });
    },
  });

  return {
    adminCommentData: data,
    adminDeleteWrongReport: mutate,
    status,
    isError,
  };
};

export default useAdminComment;
