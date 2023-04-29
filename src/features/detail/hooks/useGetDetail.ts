import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import { DetailType } from "../../../data/type/type";
import user from "../../../lib/api/user";

export const useGetDetail = (dailyId: number) => {
  const getDetail = useCallback(() => {
    return user.get(`daily/${dailyId}`, { withCredentials: true });
  }, [dailyId]);

  const { data, isError } = useQuery([keys.GET_DETAIL], getDetail);
  const year = data?.data.data.year;
  const month = data?.data.data.month;
  const contents = data?.data.data.contents;
  const targetItem = contents?.filter(
    (item: DetailType) => item.id === dailyId
  )[0];
  const otherItem = contents?.filter(
    (item: DetailType) => item.id !== dailyId
  )[0];

  return { targetItem, otherItem, isError, contents, year, month };
};
