import { DayProps } from "../../../data/type/type";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import styled from "styled-components";
import { device } from "../../../utils/theme";

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
        <EmotionIcons
          height="100%"
          width="100%"
          emotionTypes={`EMOTION_${7}`}
        />
      )}
    </Imoticon>
  );
};

const Imoticon = styled.div`
  border-radius: 50%;
  width: 70%;
  margin-top: 10px;
  margin-left: 15%;
  position: absolute;
  z-index: 0;
  ${device.mobile} {
    margin-top: 13px;
    margin-left: 11%;
    width: 70%;
  }
`;

export default CalendarEmo;
