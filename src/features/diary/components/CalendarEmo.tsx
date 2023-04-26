import { DayProps } from "../../../data/type/type";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import * as St from "../styles/CalendarEmoStyle";

const CalendarEmo = ({ data, item }: Partial<DayProps>) => {
  const emoDate = data?.contents.find((e) => e.day === item?.date);

  return (
    <St.Imoticon>
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
    </St.Imoticon>
  );
};

export default CalendarEmo;
