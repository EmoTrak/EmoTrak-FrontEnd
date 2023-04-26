import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { useNavigate } from "react-router-dom";
import { keys } from "../../../data/queryKeys/keys";
import { DETAIL_PAGE } from "../../../data/routes/urls";
import { PostInput } from "../../../data/type/type";

export const useEdit = ({ inputValue, dailyId, canvasRef }: PostInput) => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState<Blob | null>(null);
  const [photo, setPhoto] = useState<Blob | null>(null);
  const queryClient = useQueryClient();
  const editDiary = useMutation(
    async (item: FormData) => {
      await user.patch(`/daily/${dailyId}`, item);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([`${keys.GET_DETAIL}`]);
        navigate(`${DETAIL_PAGE}/${dailyId}`);
      },
      onError() {
        alert("입력한 내용을 확인해주세요!");
      },
    }
  );

  const savePictureHandler = (): void => {
    const canvas = canvasRef?.current;

    canvas?.toBlob(
      (blob) => {
        if (blob) {
          setPicture(blob);
        }
      },
      "image/png",
      0.95
    );
  };

  // 이미지 파일 업로드 함수
  const fileInputHandler = async (
    event: React.ChangeEvent<HTMLInputElement> | null
  ) => {
    const target = event?.currentTarget;
    const files = (target?.files as FileList)[0];
    const imgBlob = new Blob([files], { type: "image/jpeg" });
    setPhoto(imgBlob);
  };

  // 이미지 파일 드래그앤드랍 업로드 함수
  const fileDropHandler = async (event: React.DragEvent<HTMLLabelElement>) => {
    const files = (event.dataTransfer.files as FileList)[0];
    const imgBlob = new Blob([files], { type: "image/jpeg" });
    setPhoto(imgBlob);
  };

  const editDiaryHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const dto = new Blob([JSON.stringify(inputValue)], {
      type: "application/json",
    });
    if (picture) {
      formData.append("image", picture);
      formData.append("contents", dto);

      editDiary.mutate(formData);
    }

    if (photo !== null) {
      formData.append("image", photo);
      formData.append("contents", dto);
      editDiary.mutate(formData);
    }
    if (photo === null) {
      const formData = new FormData();
      const emptyImageBlob = new Blob([], { type: "image/jpeg" });
      formData.append("image", emptyImageBlob, "image");
      formData.append("contents", dto);
      editDiary.mutate(formData);
    }
  };

  return {
    editDiaryHandler,
    savePictureHandler,
    fileInputHandler,
    fileDropHandler,
    photo,
  };
};
