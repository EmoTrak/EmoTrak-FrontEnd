import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKey/keys";
import user from "../../../lib/api/user";

const useAddCommunityDetail = (page: number) => {
  const param = useParams();
  const dailyId: number = Number(param.id);
  const { data, isError, status, remove } = useQuery({
    queryKey: [keys.GET_BOARD_DETAIL, page],
    queryFn: async () => {
      const data = await user.get(`/boards/${dailyId}`, { params: { page } });
      return data.data.data;
    },
  });

  return { data, isError, status, remove };
};

export default useAddCommunityDetail;
