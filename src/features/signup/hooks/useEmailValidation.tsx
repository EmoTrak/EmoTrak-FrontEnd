import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const useEmailValidation = () => {
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const validEmail = (email: string): boolean =>
    /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

  const checkEmail = useMutation(
    async (item: string) => {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/em-check`,
        { email: item }
      );
      return data;
    },
    {
      onSuccess() {
        alert("사용가능한 이메일입니다.");
        setEmailValidation(true);
      },
      onError() {
        alert("중복된 이메일입니다. 다른이메일을 입력해주세요.");
        setEmailValidation(false);
      },
    }
  );

  return { validEmail, checkEmail, emailValidation, setEmailValidation };
};
