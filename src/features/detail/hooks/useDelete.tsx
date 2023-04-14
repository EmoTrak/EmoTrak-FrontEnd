import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { useNavigate } from "react-router-dom";

export const useDelete = () => {
  const navigate = useNavigate();
  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      await user.delete(`/daily/${id}`);
    },
    onSuccess: () => {
      navigate(-1);
    },
  });

  return { deletePost };
};
