import { useMutation } from "@tanstack/react-query";
import { SignInfo } from "../../../data/type/d3";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../../../data/routes/urls";

export const useSignup = () => {
  const navigate = useNavigate();
  const signup = useMutation(
    async (item: SignInfo) => {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/signup`,
        item
      );
      return data;
    },
    {
      onSuccess() {
        alert("환영합니다!");
        navigate(`${LOGIN_PAGE}`);
      },
      onError() {},
    }
  );

  return { signup };
};
