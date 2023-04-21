import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

const useAddCommunityDetail = (page: number) => {
  const param = useParams();
  const navigate = useNavigate();
  const dailyId: number = Number(param.id);
  const { data, isError, status, remove } = useQuery({
    queryKey: [keys.GET_BOARD_DETAIL, page],
    queryFn: async () => {
      const data = await user.get(`/boards/${dailyId}`, { params: { page } });
      return data.data.data;
    },
    onError: (error: AxiosError<object>) => {
      error?.response?.status === 404 && alert("삭제된 페이지입니다");
      navigate(-1);
    },
  });

  return { data, isError, status, remove };
};

export default useAddCommunityDetail;
