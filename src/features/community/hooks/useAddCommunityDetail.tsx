import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

const useAddCommunityDetail = (page: number) => {
  const param = useParams();
  const navigate = useNavigate();
  const dailyId: number = Number(param.id);
  const { data, isLoading, status } = useQuery({
    queryKey: [keys.GET_BOARD, page],
    queryFn: async () => {
      const data = await user.get(`/boards/${dailyId}`, { params: { page: page } });
      return data.data.data;
    },
    onError: (error: AxiosError<object>) => {
      error?.response?.status === 404 && alert("삭제된 페이지입니다");
      navigate(-1);
    },
  });

  return { data, isLoading, status };
};

export default useAddCommunityDetail;
