import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";
import { useParams } from "react-router-dom";

const useAddCommunityDetail = (page: number) => {
  const param = useParams();
  const dailyId: number = Number(param.id);
  const { data, isError, isLoading, status } = useQuery({
    queryKey: [keys.GET_BOARD, page],
    queryFn: async () => {
      const data = await user.get(`/boards/${dailyId}`, { params: { page: page } });
      return data.data.data;
    },
  });

  return { data, isError, isLoading, status };
};

export default useAddCommunityDetail;
