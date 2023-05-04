import { useInfiniteQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKey/keys";
import user from "../../../lib/api/user";
import { useState } from "react";
import { ImageType } from "../../../data/type/type";

const useInfinite = (paramSort: string | null, paramEmo: string | null) => {
  // const [postData, setPostData] = useState<ImageType[]>([]);

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
    // onSuccess: () => {
    //   if (data) {
    //     const newData = data.pages.reduce(
    //       (arr: never[] | ImageType[], cur) => [...arr, ...cur.data],
    //       []
    //     );
    //     setPostData(newData);
    //   }
    // },
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
  };
};

export default useInfinite;
