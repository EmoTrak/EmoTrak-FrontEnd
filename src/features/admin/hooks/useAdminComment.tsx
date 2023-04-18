import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";

const useAdminComment = (page: number) => {
  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: [keys.GET_ADMIN, page],
    queryFn: async () => {
      const { data } = await user.get("/admin/comments", { params: { page } });
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
console.log(data);

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
    status,
  };
};

export default useAdminComment;
