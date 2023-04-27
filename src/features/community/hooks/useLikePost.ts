import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LikeType } from "../../../data/type/type";
import user from "../../../lib/api/user";

export const useLikePost = ({ isLike, id, count }: LikeType) => {
  const [like, setLike] = useState<Partial<LikeType>>({
    isLike,
    count,
  });

  const { mutate: likeMutate } = useMutation({
    mutationFn: async () => {
      const data = await user.post(`/boards/likes/${id}`);
      return data.data;
    },
    onMutate: () => {
      if (like.isLike)
        return setLike({
          ...like,
          isLike: false,
          count: Number(like.count) - 1,
        });
      else {
        return setLike({
          ...like,
          isLike: true,
          count: Number(like.count) + 1,
        });
      }
    },
    onSuccess: (likedata) =>
      setLike({
        ...like,
        isLike: likedata?.data.hasLike,
        count: likedata?.data.likesCount,
      }),
  });
  return { likeMutate, like };
};
