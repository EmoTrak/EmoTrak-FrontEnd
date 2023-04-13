import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";

const useAdminPost = () => {
  const { data } = useQuery({
    queryKey: [keys.GET_ADMIN],
    queryFn: async () => {
      const { data } = await user.get("/admin/boards");
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: async (payload: number) => {
      console.log(payload);
      const { data } = await user.patch(`/boards/restrict/${payload}`);
      return data;
    },
    onSuccess: () => {
      alert("삭제완료");
    },
  });

  return { adminPostData: data, adminDeleteData: mutate };
};

export default useAdminPost;
