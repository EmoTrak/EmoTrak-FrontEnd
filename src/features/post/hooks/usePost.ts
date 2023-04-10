import { useState } from "react";
import { InputValue } from "../../../pages/DrawingPost";
import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { useNavigate } from "react-router-dom";

type PostInput = {
  inputValue?: InputValue;
  canvas?: HTMLCanvasElement | null;
};

export const usePost = ({ inputValue, canvas }: PostInput) => {
  const navigate = useNavigate();
  const [picture, setPicture] = useState<Blob | null>(null);

  const savePictureHandler = () =>
    canvas?.toBlob(
      (blob) => {
        if (blob) {
          setPicture(blob);
        }
        console.log(blob);
      },
      "image/jpeg",
      0.95
    );

  const postDiary = useMutation(
    async (item: FormData) => {
      const data = await user.post("/daily", item);
      return data;
    },
    {
      onSuccess(data) {
        navigate("/");
      },
      onError(err) {
        alert("입력한 내용을 확인해주세요!");
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
      console.log("formData/image", formData.get("image"));
      console.log("formData/contents", formData.get("contents"));

      postDiary.mutate(formData);
    }
  };

  return { submitDiaryHandler, savePictureHandler };
};
