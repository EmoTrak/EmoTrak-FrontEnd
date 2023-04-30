import { useState } from "react";
export const usePreview = () => {
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const preview = (
    imgFile: File | Blob | null | undefined
  ): string | undefined | null => {
    if (!imgFile) {
      return null;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const previewUrl = reader.result;
      return setPreviewUrl(previewUrl);
    };
    reader.readAsDataURL(imgFile);
  };
  return { preview, previewUrl };
};
