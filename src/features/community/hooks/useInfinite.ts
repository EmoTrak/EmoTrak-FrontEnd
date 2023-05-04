import { useInfiniteQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKey/keys";
import user from "../../../lib/api/user";

const useInfinite = (paramSort: string | null, paramEmo: string | null) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
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
    isLoading,
  };
};

export default useInfinite;
