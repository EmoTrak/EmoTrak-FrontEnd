import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import user from "../../../lib/api/user";

export const useEmailValidation = () => {
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const validEmail = (email: string): boolean =>
    /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);

  // const confirmEmail = useMutation({
  //   mutationFn: async() => {
  //     await user.post('/users/mail-confirm', )
  //   },
  // })
  const checkEmail = useMutation(
    async (email: string) => {
      const data = await user.post(`/users/mail-confirm`, { email });
      return data;
    },
    {
      onSuccess() {
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
