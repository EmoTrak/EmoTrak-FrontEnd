import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import user from "../../../lib/api/user";

export const useEmailValidation = () => {
  const [emailValidation, setEmailValidation] = useState<boolean>(false);
  const validEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
  };

  const checkEmail = useMutation(
    async (email: string) => {
      const data = await user.post(`/users/mail-confirm`, { email });
      return data;
    },
    {
      onSuccess() {
        setEmailValidation(true);
      },
    }
  );

  return {
    validEmail,
    checkEmail,
    emailValidation,
    setEmailValidation,
  };
};
