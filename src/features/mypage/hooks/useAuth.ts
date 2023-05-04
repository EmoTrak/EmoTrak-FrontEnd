import { useQuery } from "@tanstack/react-query";
import { keys } from "../../../data/queryKey/keys";
import user from "../../../lib/api/user";

export const useAuth = () => {
  const { data, isLoading } = useQuery({
    queryKey: [keys.GET_USER],
    queryFn: async () => {
      const data = await user.get(`/users/mypage`);
      return data.data.data;
    },
  });

  return { userInfo: data, isLoading };
};
