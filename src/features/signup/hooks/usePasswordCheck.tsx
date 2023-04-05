export const usePasswordCheck = (original: string) => {
  const validPassword = (item: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(item) ? true : false;

  const checkPasswordHandler = (item: string): boolean => {
    return original !== item ? false : true;
  };

  return { validPassword, checkPasswordHandler };
};
