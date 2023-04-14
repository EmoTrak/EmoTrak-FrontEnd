import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

const useLikeComment = (setLike: React.Dispatch<React.SetStateAction<object>>) => {
  const { mutate } = useMutation({
    mutationFn: async (id: number | undefined) => {
      console.log(id);
      const data = await user.post(`/boards/comments/likes/${id}`);
      return data.data;
    },
    onSuccess: (data) =>
      setLike({
        isLike: data?.data.hasLike,
        count: data?.data.likesCount,
      }),
  });

  return { likeMutate: mutate };
};

export default useLikeComment;
