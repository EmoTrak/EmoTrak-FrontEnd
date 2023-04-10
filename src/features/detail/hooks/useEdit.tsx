import { useState } from "react";
import { InputValue } from "../../../pages/DrawingPost";
import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { useNavigate } from "react-router-dom";
import { DETAIL_PAGE } from "../../../data/routes/urls";

type PostInput = {
  inputValue?: InputValue;
  dailyId?: number | undefined;
};

export const useEdit = ({ inputValue, dailyId }: PostInput) => {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<Blob | null>(null);

  const editDiary = useMutation(
    async (item: FormData) => {
      const data = await user.patch(`/daily/${dailyId}`, item);
      return dailyId;
    },
    {
      onSuccess(data) {
        alert("수정되었습니다");
        navigate(`${DETAIL_PAGE}/${data}`);
      },
      onError(err) {
        alert("입력한 내용을 확인해주세요!");
      },
    }
  );

  // 이미지 파일 업로드 함수
  const fileInputHandler = async (
    event: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    const target = event?.currentTarget;
    const files = (target?.files as FileList)[0];
    const imgBlob = new Blob([files], { type: "image/jpeg" });
    setPhoto(imgBlob);
  };

  const editDiaryHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const dto = new Blob([JSON.stringify(inputValue)], {
      type: "application/json",
    });
    if (photo) {
      event.preventDefault();
      formData.append("image", photo);
      formData.append("contents", dto);
      console.log("formData/image", formData.get("image"));
      console.log("formData/contents", formData.get("contents"));
      editDiary.mutate(formData);
    }
    if (photo === null) {
      event.preventDefault();
      const formData = new FormData();
      const emptyImageBlob = new Blob([], { type: "image/jpeg" });
      formData.append("image", emptyImageBlob, "image");
      formData.append("dto", dto);
      editDiary.mutate(formData);
    }
  };

  return { editDiaryHandler, fileInputHandler, photo };
};
