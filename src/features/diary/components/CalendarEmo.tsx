import { DayProps } from "../../../data/type/d1";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import styled from "styled-components";

const CalendarEmo = ({ data, item }: Partial<DayProps>) => {
  const emoDate = data?.contents.find((e) => e.day === item?.date);

  return (
    <Imoticon>
      {emoDate ? (
        <EmotionIcons
          height="100%"
          width="100%"
          emotionTypes={`EMOTION_${emoDate?.emoId}`}
        />
      ) : (
        <EmotionIcons height="100%" width="100%" emotionTypes={`EMOTION_${7}`} />
      )}
    </Imoticon>
  );
};

const Imoticon = styled.div`
  border-radius: 50%;
  width: 5vw;
  margin-top: 10px;
  margin-left: 13px;
  position: absolute;
  z-index: 0;
`;

export default CalendarEmo;
