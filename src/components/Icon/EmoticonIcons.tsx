import { getEmotionIcon } from "./getEmoticonIcon";
import { IProps } from "../../data/type/type";

const EmotionIcons = ({ emotionTypes, height, width }: IProps) => {
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
