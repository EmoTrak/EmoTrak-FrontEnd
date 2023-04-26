import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { useNavigate } from "react-router-dom";
import { keys } from "../../../data/queryKeys/keys";
import { PostInput } from "../../../data/type/type";

export const usePost = ({ inputValue, canvasRef }: PostInput) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [picture, setPicture] = useState<Blob | null>(null);
  const [photo, setPhoto] = useState<Blob | null>(null);

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
  const fileInputHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const target = event.currentTarget;
    const files = (target.files as FileList)[0];
    const imgBlob = new Blob([files], { type: "image/jpeg" });
    setPhoto(imgBlob);
  };

  // 이미지 파일 드래그앤드랍 업로드 함수
  const fileDropHandler = (event: React.DragEvent<HTMLLabelElement>): void => {
    const files = (event.dataTransfer.files as FileList)[0];
    const imgBlob = new Blob([files], { type: "image/jpeg" });
    setPhoto(imgBlob);
  };

  const postDiary = useMutation(
    async (item: FormData) => {
      const data = await user.post("/daily", item);
      return data;
    },
    {
      onSuccess(data) {
        queryClient.refetchQueries({
          queryKey: [keys.GET_BOARD],
        });
        const newItemId = data.data.data.id;
        queryClient.invalidateQueries([`${keys.GET_DETAIL}`, newItemId]);
        navigate(`/detail/${newItemId}`);
      },
      onError() {
        alert("입력한 내용을 확인해주세요!");
      },
    }
  );

  const submitDiaryHandler = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    const formData = new FormData();
    const dto = new Blob([JSON.stringify(inputValue)], {
      type: "application/json",
    });
    if (picture) {
      formData.append("image", picture);
      formData.append("contents", dto);

      postDiary.mutate(formData);
    }

    if (photo) {
      formData.append("image", photo);
      formData.append("contents", dto);

      postDiary.mutate(formData);
    }
  };

  return {
    submitDiaryHandler,
    savePictureHandler,
    fileInputHandler,
    fileDropHandler,
    photo,
  };
};
