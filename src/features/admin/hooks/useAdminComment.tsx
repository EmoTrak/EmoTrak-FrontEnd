import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";

const useAdminComment = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: [keys.GET_ADMIN],
    queryFn: async () => {
      const { data } = await user.get("/admin/comments");
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: async (payload: number) => {
      console.log(payload);
      const { data } = await user.delete(`/boards/comments/${payload}`);
      return data;
    },
    onSuccess: () => {
      alert("삭제완료");
      queryClient.invalidateQueries({ queryKey: [keys.GET_ADMIN] });
    },
  });

  return {
    adminCommentData: data,
    adminCommentDelete: mutate,
  };
};

export default useAdminComment;
