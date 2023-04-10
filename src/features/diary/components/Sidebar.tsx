import styled, { css, keyframes } from 'styled-components';
import { DayProps } from '../../../data/type/d1';
import EmotionIcons from '../../../components/Icon/EmoticonIcons';
import { useNavigate } from 'react-router-dom';
import { DETAIL_PAGE } from '../../../data/routes/urls';
import ClickModalPost from './ClickModalPost';

const Sidebar = ({ side, setSide, data, diaryDay }: Partial<DayProps>): JSX.Element => {
  const navigate = useNavigate();
  const ClickCloseBtn = (): void => {
    if (setSide) setSide(false);
  };

  const detailData = data?.contents.filter((e) => e.day === diaryDay?.date);

  return (
    <>
      <CloseBtn onClick={ClickCloseBtn} side={side}>
        X
      </CloseBtn>
      <Container side={side}>
        {detailData?.map((e, i) => (
          <ContentBox key={i}>
            <Imoticon>
              <EmotionIcons
                height="100%"
                width="100%"
                emotionTypes={`EMOTION_${e.emoId}`}
              />
            </Imoticon>
            <Content key={i} onClick={() => navigate(`${DETAIL_PAGE}/${e.id}`)}>
              {e.detail}
            </Content>
          </ContentBox>
        ))}
        {Number(detailData?.length) < 2 && (
          <ContentBox>
            <Imoticon>
              <EmotionIcons height="100%" width="100%" emotionTypes={'EMOTION_7'} />
            </Imoticon>
            <ClickModalPost diaryDay={diaryDay}>
              <PostContent>+</PostContent>
            </ClickModalPost>
          </ContentBox>
        )}
      </Container>
    </>
  );
};
const OpenBox = keyframes`
  from {
    right: -100%;
  }
  to {
    right: 0%;
  }
`;

const CloseBox = keyframes`
  from {
    right: 0%;
  }
  to {
    right: -100%;
  }
`;

const Container = styled.div`
  width: 27vw;
  height: 55vw;
  background-color: #e5dfd3;
  box-sizing: border-box;
  padding: 6vw 1vw;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 10%;
  right: 0;
  ${({ side }: Partial<DayProps>) =>
    side
      ? css`
          animation: ${OpenBox} 0.5s ease;
        `
      : css`
          animation: ${CloseBox} 0.5s ease;
        `}
`;

const CloseBtn = styled.button`
  height: 40px;
  width: 30px;
  background-color: #e5dfd3;
  ${({ side }: Partial<DayProps>) =>
    side
      ? css`
          animation: ${OpenBox} 0.5s ease;
        `
      : css`
          animation: ${CloseBox} 0.5s ease;
        `}
`;
const ContentBox = styled.div`
  height: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 0.5vw;
  padding: 1.5vw;
  box-sizing: border-box;
  width: 20.5vw;
  height: 80%;
  overflow: hidden;
  word-break: break-all;
`;

const Imoticon = styled.div`
  border: 0.4vw solid white;
  border-radius: 50%;
  background-color: white;
  height: 2.5vw;
  width: 2.5vw;
`;

const PostContent = styled.div`
  background-color: white;
  border-radius: 0.5vw;
  width: 20.5vw;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  font-weight: 700;
  cursor: pointer;
`;

export default Sidebar;
