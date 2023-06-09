import Emotion_1 from '../../assets/emoticon/1_Fun.svg';
import Emotion_2 from '../../assets/emoticon/2_Smile.svg';
import Emotion_3 from '../../assets/emoticon/3_Calm.svg';
import Emotion_4 from '../../assets/emoticon/4_Sad.svg';
import Emotion_5 from '../../assets/emoticon/5_Angry.svg';
import Emotion_6 from '../../assets/emoticon/6_Cry.svg';
import Emotion_7 from '../../assets/emoticon/7_none.svg';

export type EmotionTypes =
  | 'EMOTION_1'
  | 'EMOTION_2'
  | 'EMOTION_3'
  | 'EMOTION_4'
  | 'EMOTION_5'
  | 'EMOTION_6'
  | 'EMOTION_7';

export const getEmotionIcon = (emotion: string): string | undefined => {
  const emotionIcons = new Map([
    ['EMOTION_1', `${Emotion_1}`],
    ['EMOTION_2', `${Emotion_2}`],
    ['EMOTION_3', `${Emotion_3}`],
    ['EMOTION_4', `${Emotion_4}`],
    ['EMOTION_5', `${Emotion_5}`],
    ['EMOTION_6', `${Emotion_6}`],
    ['EMOTION_7', `${Emotion_7}`],
  ]);

  return emotionIcons.get(emotion);
};
