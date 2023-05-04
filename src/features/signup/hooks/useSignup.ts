import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { LoginInfo } from "../../../data/type/type";
import user from "../../../lib/api/user";

export const useSignup = () => {
  const navigate = useNavigate();
  const signup = useMutation(
    async (item: LoginInfo & { nickname: string }): Promise<void> => {
      await user.post(`/users/signup`, item);
    },
    {
      onSuccess() {
        alert("환영합니다!");
        navigate("/");
      },
    }
  );

  return { signup };
};
