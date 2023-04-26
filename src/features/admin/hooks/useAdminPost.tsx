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
  });

  const { mutate: restrictShare } = useMutation({
    mutationFn: async (payload: number) => {
      await user.patch(`/admin/restrict/${payload}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.GET_ADMIN] });
    },
  });

  const { mutate: onReportDelete } = useMutation({
    mutationFn: async (payload: number) => {
      await user.delete(`/admin/report/${payload}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.GET_ADMIN] });
    },
  });

  return {
    adminPostData: data,
    restrictShare,
    onReportDelete,
    status,
  };
};

export default useAdminPost;
