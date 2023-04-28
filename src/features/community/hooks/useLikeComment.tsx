import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LikeType } from "../../../data/type/type";
import user from "../../../lib/api/user";

const useLikeComment = ({ isLike, count }: Partial<LikeType>) => {
  const [like, setLike] = useState<Partial<LikeType>>({
    isLike,
    count,
  });
  const { mutate } = useMutation({
    mutationFn: async (id: number | undefined) => {
      const data = await user.post(`/boards/comments/likes/${id}`);
      return data.data;
    },
    onSuccess: (data) =>
      setLike({
        isLike: data?.data.hasLike,
        count: data?.data.likesCount,
      }),
  });

  return { likeMutate: mutate, like };
};

export default useLikeComment;
