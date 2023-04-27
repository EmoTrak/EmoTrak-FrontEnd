import React from "react";
import { EmoButton } from "../styles/DrawingStyle";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import Flex from "../../../components/Flex";

interface Test {
  value: number;
  action: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const EmoScore = ({ value, action }: Test) => {
  return (
    <Flex row>
      {[1, 2, 3, 4, 5, 6].map((item: number) => (
        <EmoButton
          name="emoId"
          type="button"
          value={item}
          key={item}
          selected={value === item}
          onClick={action}
        >
          <EmotionIcons
            height="100%"
            width="100%"
            emotionTypes={`EMOTION_${item}`}
          />
        </EmoButton>
      ))}
    </Flex>
  );
};

export default EmoScore;
