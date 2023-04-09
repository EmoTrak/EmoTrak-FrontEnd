import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";

type UploadImage = {
  file: File;
  thumbnail: string;
  type: string;
};

const Image = (): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<UploadImage | null>(null);

  const onClickFileInput = (): void => {
    fileInputRef.current?.click();
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const length = fileList?.length;
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0]);
      setImageFile({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type.slice(0, 5),
      });
    }
  };
  const showImage = useMemo(() => {
    if (!imageFile && imageFile == null) {
      return (
        <ShowFileImage
          src="https://w7.pngwing.com/pngs/790/1002/png-transparent-square-empty-rounded-corners-tools-icon-thumbnail.png"
          alt="비어있는 프로필"
        />
      );
    }
    return (
      <ShowFileImage
        src={imageFile.thumbnail}
        alt={imageFile.type}
        onClick={onClickFileInput}
      />
    );
  }, [imageFile]);
  return (
    <div>
      <h2>파일업로드</h2>
      <ShowImage>{showImage}</ShowImage>
      <form>
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/jpg, image/jpeg, image/png, image/gif"
          ref={fileInputRef}
          onChange={uploadFile}
        />
        <button type="button" onClick={onClickFileInput}>
          파일업로드버튼
        </button>
      </form>
    </div>
  );
};

export default Image;

const ShowFileImage = styled.img`
  width: 100px;
  height: 100px;
`;
const ShowImage = styled.div`
  width: 100px;
  height: 100px;
  
`;
