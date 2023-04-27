import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import { useCallback } from "react";
import user from "../../../lib/api/user";
import { DetailType } from "../../../data/type/type";

export const useGetDetail = (dailyId: number) => {
  const getDetail = useCallback(() => {
    return user.get(`daily/${dailyId}`);
  }, [dailyId]);

  const { data, isLoading } = useQuery([keys.GET_DETAIL], getDetail);

  const contents = data?.data.data.contents;
  const targetItem = contents?.filter(
    (item: DetailType) => item.id === dailyId
  )[0];
  const otherItem = contents?.filter(
    (item: DetailType) => item.id !== dailyId
  )[0];
  return { targetItem, otherItem, isLoading, contents };
};
