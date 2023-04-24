import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";

function useChartData(select: number) {
  const { data, isError, isLoading } = useQuery({
    queryKey: [keys.GET_CHART, select],
    queryFn: async () => {
      const { data } = await user.get("/graph/", {
        params: { year: select },
      });
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { chartData: data, isLoading, isError };
}

export default useChartData;
