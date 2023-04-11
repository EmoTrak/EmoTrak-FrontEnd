import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

type AuthProps = {
  action: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useAuth = (
  action: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const authorization = useMutation(
    async (item: string | undefined) => {
      const data = await user.post(`/users/mypage`, item);
      return data;
    },
    {
      onSuccess(data) {
        action(true);
      },
      onError(error) {
        alert("비밀번호를 확인해주세요");
        action(false);
      },
    }
  );

  return { authorization };
};
