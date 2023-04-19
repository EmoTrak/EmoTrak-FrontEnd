import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";

const useAdminPost = (page: number) => {
  const queryClient = useQueryClient();

  const { data, status } = useQuery({
    queryKey: [keys.GET_ADMIN, page],
    queryFn: async () => {
      const { data } = await user.get("/admin/boards", {
        params: { page },
      });
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  //신고된 게시물 공유해제
  const { mutate } = useMutation({
    mutationFn: async (payload: number) => {
      console.log(payload);
      const { data } = await user.patch(`/admin/restrict/${payload}`);
      return data;
    },
    onSuccess: () => {
      alert("공유해제완료");
      queryClient.invalidateQueries({ queryKey: [keys.GET_ADMIN] });
    },
    onError: (err) => {
      alert(err);
    },
  });
  // 신고된 게시물, 댓글 삭제
  const { mutate: onReportDelete } = useMutation({
    mutationFn: async (payload: number) => {
      console.log(payload);
      const { data } = await user.delete(`/admin/report/${payload}`);
      return data;
    },
    onSuccess: (res) => {
      alert("잘못된 신고 삭제완료");
      queryClient.invalidateQueries({ queryKey: [keys.GET_ADMIN] });
    },
    onError: (err) => {
      alert(err);
    },
  });

  return {
    adminPostData: data,
    adminDeleteData: mutate,
    onReportDelete,
    status,
  };
};

export default useAdminPost;
