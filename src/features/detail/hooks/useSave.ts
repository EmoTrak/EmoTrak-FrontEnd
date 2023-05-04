import { useState } from "react";
import { DetailType } from "../../../data/type/type";
import axios from "axios";

export const useSave = (targetItem: DetailType, dailyId: number) => {
  const [openDownload, setOpenDownload] = useState(false);

  const downloadPicture = () => {
    axios
      .get(targetItem?.imgUrl, { responseType: "blob" })
      .then((data) => {
        const url = window.URL.createObjectURL(
          new Blob([data.data], { type: "image/png" })
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = `emotrak_${dailyId}`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 30000);
        a.remove();
        setOpenDownload(false);
      })
      .catch((error) => {
        console.error("err: ", error);
      });
  };

  return { openDownload, downloadPicture, setOpenDownload };
};
