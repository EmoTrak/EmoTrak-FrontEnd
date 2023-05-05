import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKey/keys";
import { AxiosError, DetailType } from "../../../data/type/type";
import user from "../../../lib/api/user";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../../data/routes/urls";

export const useGetDetail = (dailyId: number) => {
  const navigate = useNavigate();
  const getDetail = async () => {
    return await user.get(`daily/${dailyId}`);
  };

  const { data, isError } = useQuery({
    queryKey: [keys.GET_DETAIL],
    queryFn: getDetail,
    onError: (error: AxiosError) => {
      if (
        (error.response.status === 401 && error.response.data.errorCode === "x-1005") ||
        error.response.status === 404
      ) {
        navigate(HOME_PAGE);
      }
    },
  });
  const year = data?.data.data.year;
  const month = data?.data.data.month;
  const contents = data?.data.data.contents;

  const targetItem = contents?.find((item: DetailType) => item.id === dailyId);
  const otherItem = contents?.find((item: DetailType) => item.id !== dailyId);

  return { targetItem, otherItem, isError, contents, year, month };
};
