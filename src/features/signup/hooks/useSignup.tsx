import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignInfo } from "../../../data/type/type";

export const useSignup = () => {
  const navigate = useNavigate();
  const signup = useMutation(
    async (item: SignInfo): Promise<void> => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/signup`,
        item
      );
    },
    {
      onSuccess() {
        alert("환영합니다!");
        navigate("/");
      },
      onError() {},
    }
  );

  return { signup };
};
