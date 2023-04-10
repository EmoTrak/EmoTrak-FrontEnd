import { DayProps } from '../../../data/type/d1';
import EmotionIcons from '../../../components/Icon/EmoticonIcons';
import styled from 'styled-components';

const CalendarEmo = ({ data, item, today }: Partial<DayProps>) => {
  const emoDate = data?.contents.find((e) => e.day === item?.date);

  // console.log('data', data);
  // console.log('item', item);
  // console.log('today', today);

  // const beforeToday = () => {
  //     return console.log();
  //   }
  // };

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
  height: 5vw;
  width: 5vw;
  margin-top: 0.5vw;
  margin-left: 1.5vw;
  position: absolute;
`;

export default CalendarEmo;
