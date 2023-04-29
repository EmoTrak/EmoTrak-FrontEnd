import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";

export const useGetDiary = (year: number, month: number) => {
  const { data: diary, isError } = useQuery({
    queryKey: [keys.GET_DIARY, year, month],
    queryFn: async () => {
      const data = await user.get("/daily", {
        params: { year, month },
      });
      return data.data.data;
    },
  });
  return { diary, isError };
};
