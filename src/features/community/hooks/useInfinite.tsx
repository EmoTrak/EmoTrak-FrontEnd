import { useQuery } from '@tanstack/react-query';
import user from '../../../lib/api/user';
import { keys } from '../../../data/queryKeys/keys';
import { SelectType } from '../../../data/type/d1';

const useInfinite = (select: SelectType) => {
  const { data, isLoading, isError, status, refetch } = useQuery({
    queryKey: [keys.GET_BOARD, select],
    queryFn: async () => {
      const data = await user.get(`/boards`, { params: select });
      return { data: data.data.data.contents, isLast: data.data.data.lastPage };
    },
    keepPreviousData: true,
  });

  return {
    boardData: data?.data,
    isLast: data?.isLast,
    boardLoading: isLoading,
    boardError: isError,
    status,
    refetch,
  };
};

export default useInfinite;
