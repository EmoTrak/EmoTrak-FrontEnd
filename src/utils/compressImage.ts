import imageCompression from "browser-image-compression";

const compressImage = (source: File, maxSize: number) => {
  const compressImgHandler = (fileSrc: File) => {
    const options = {
      maxSizeMB: maxSize,
      maxWidthOrHeight: 640,
      useWebWorker: true,
    };
    try {
      const compressedFile = imageCompression(fileSrc, options);
      return compressedFile;
    } catch (error) {
      alert("이미지 파일이 너무 큽니다!");
    }
  };

  const compressedImg = compressImgHandler(source);

  return compressedImg;
};

export default compressImage;
