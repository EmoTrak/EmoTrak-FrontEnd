import { useInfiniteQuery } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { keys } from "../../../data/queryKeys/keys";

const useInfinite = (paramSort: string | null, paramEmo: string | null) => {
  // if (!paramSort) {
  //   paramSort = "recent";
  // }
  // if (!paramEmo) {
  //   paramEmo = "1,2,3,4,5,6";
  // }
  const { data, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [keys.GET_BOARD, paramSort, paramEmo],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await user.get(`/boards?page=${pageParam}`, {
        params: {
          sort: paramSort,
          size: 40,
          emo: paramEmo,
        },
      });
      return { data: data.data.data.contents, pageParam };
    },
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageParam + 1;
      if (lastPage.data.length > 0) {
        return nextPage;
      }
    },
    refetchOnMount: false,
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
