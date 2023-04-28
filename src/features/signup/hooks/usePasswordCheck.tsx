import { useState } from "react";

export const usePasswordCheck = (original: string) => {
  const [doublePassword, setDoublePassword] = useState(false);

  const validPassword = (item: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d|$@!%*#?&()^]{8,15}$/.test(item);

  const checkPasswordHandler = (item: string) => {
    return setDoublePassword(original === item);
  };

  return { validPassword, checkPasswordHandler, doublePassword };
};
