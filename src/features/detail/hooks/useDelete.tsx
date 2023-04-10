import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { useNavigate } from "react-router-dom";

export const useDelete = () => {
  const navigate = useNavigate();
  const deletePost = useMutation(
    async (id: number) => {
      await user.delete(`/daily/${id}`);
      return id;
    },
    {
      onSuccess(data) {
        navigate(`/`);
      },
    }
  );

  return { deletePost };
};
