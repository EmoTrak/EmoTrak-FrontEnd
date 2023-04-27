import { FC } from "react";
import { getEmotionIcon } from "./getEmoticonIcon";
import { IProps } from "../../data/type/type";

const EmotionIcons: FC<IProps> = ({ emotionTypes, height, width }) => {
  return (
    <img
      height={height}
      width={width}
      src={getEmotionIcon(emotionTypes)}
      alt=""
    />
  );
};

export default EmotionIcons;
