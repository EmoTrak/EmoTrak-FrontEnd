import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import testImg from '../../../assets/emoticon/테스트용.png';
import { SidebarProps } from '../../../data/type/d1';
import EmotionIcons from '../../../components/Icon/EmoticonIcons';
import { useNavigate } from 'react-router-dom';
import { DETAIL_PAGE } from '../../../data/routes/urls';
import ClickModalPost from './ClickModalPost';
const Sidebar = ({
  side,
  setSide,
  data,
  diaryDay,
}: Partial<SidebarProps>): JSX.Element => {
  const navi = useNavigate();
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
            <Content key={i} onClick={() => navi(`${DETAIL_PAGE}/${e.id}`)}>
              {e.detail}
            </Content>
          </ContentBox>
        ))}
        {Number(detailData?.length) < 2 && (
          <ContentBox>
            <Imoticon>
              <EmotionIcons height="100%" width="100%" emotionTypes={'EMOTION_7'} />
            </Imoticon>
            <PostContent>
              <ClickModalPost>+</ClickModalPost>
            </PostContent>
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
  width: 25vw;
  height: 60vw;
  background-color: #e5dfd3;
  box-sizing: border-box;
  padding: 10vw 2vw;
  display: flex;
  flex-direction: column;
  gap: 6vw;
  position: relative;
  ${({ side }: Partial<SidebarProps>) =>
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
  ${({ side }: Partial<SidebarProps>) =>
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
  border-radius: 20px;
  padding: 1.5vw;
  box-sizing: border-box;
  width: 70%;
  height: 100%;
  /* right: 5%; */
  overflow: hidden;
  word-break: break-all;
  /* position: absolute; */
`;

const Imoticon = styled.div`
  border: 5px solid white;
  border-radius: 50%;
  background-color: white;
  height: 5vw;
  width: 5vw;
`;

const PostContent = styled.div`
  background-color: white;
  border-radius: 20px;
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  cursor: pointer;
`;

export default Sidebar;
