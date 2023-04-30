import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { useNavigate } from "react-router-dom";
import { keys } from "../../../data/queryKey/keys";
import { PostInput } from "../../../data/type/type";
import compressImage from "../../../utils/compressImage";

export const usePost = ({ inputValue, canvasRef }: PostInput) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [picture, setPicture] = useState<Blob | null>(null);
  const [photo, setPhoto] = useState<File | null | undefined>(null);

  const savePictureHandler = () => {
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
    if (files.size > 52428800) {
      const compressedImg = await compressImage(files, 49);
      setPhoto(compressedImg);
    } else {
      setPhoto(files);
    }
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
    }
  );

  const submitDiaryHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
