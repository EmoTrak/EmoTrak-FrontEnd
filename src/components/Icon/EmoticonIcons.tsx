import { FC } from "react";
import { EmotionTypes, getEmotionIcon } from "./getEmoticonIcon";

interface IProps {
  emotionTypes: EmotionTypes;
  height: string;
  width: string;
}

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
