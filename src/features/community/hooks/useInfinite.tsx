import { useInfiniteQuery } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { keys } from "../../../data/queryKeys/keys";
import { SelectType } from "../../../data/type/d1";

const useInfinite = (select: SelectType) => {
  const { data, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [keys.GET_BOARD, select],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await user.get(`/boards?page=${pageParam}`, { params: select });
      return { data: data.data.data.contents, pageParam };
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageParam + 1;
      if (lastPage.data.length > 0) {
        return nextPage;
      }
    },
    staleTime: 50000,
    keepPreviousData: true,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    boardError: isError,
  };
};

export default useInfinite;
