import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { keys } from "../../../data/queryKey/keys";
import { PostInput } from "../../../data/type/type";
import { DETAIL_PAGE } from "../../../data/routes/urls";
import user from "../../../lib/api/user";
import compressImage from "../../../utils/compressImage";

export const useEdit = ({ inputValue, dailyId, canvasRef }: PostInput) => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState<Blob | null>(null);
  const [photo, setPhoto] = useState<File | null | undefined>(null);

  const queryClient = useQueryClient();
  const editDiary = useMutation(
    async (item: FormData) => {
      await user.patch(`/daily/${dailyId}`, item);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([keys.GET_DETAIL, keys.GET_BOARD]);
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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.currentTarget;
    const files = (target.files as FileList)[0];
    if (files.size > 52428800) {
      const compressedImg = await compressImage(files, 49);
      setPhoto(compressedImg);
    } else {
      setPhoto(files);
    }
  };

  // 이미지 파일 드래그앤드랍 업로드 함수
  const fileDropHandler = async (event: React.DragEvent<HTMLLabelElement>) => {
    const files = (event.dataTransfer.files as FileList)[0];
    // console.log(files);s
    if (files.size > 52428800) {
      const compressedImg = await compressImage(files, 49);
      setPhoto(compressedImg);
    } else {
      setPhoto(files);
    }
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

    if (photo) {
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
