import styled, { keyframes } from "styled-components";
import { DayProps } from "../../../data/type/d1";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import { useNavigate } from "react-router-dom";
import { DETAIL_PAGE } from "../../../data/routes/urls";
import ClickModalPost from "./ClickModalPost";
import { MdArrowForwardIos } from "react-icons/md";

const Sidebar = ({ side, setSide, data, diaryDay }: Partial<DayProps>): JSX.Element => {
  const navigate = useNavigate();

  const ClickCloseBtn = () => {
    if (setSide) {
      setSide((prev) => !prev);
    }
  };

  const detailData = data?.contents.filter((e) => e.day === diaryDay?.date);

  return (
    <>
      <Wrap side={side}>
        <CloseBtn onClick={ClickCloseBtn}>
          <MdArrowForwardIos />
        </CloseBtn>
        <Container>
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
                <EmotionIcons height="100%" width="100%" emotionTypes={"EMOTION_7"} />
              </Imoticon>
              <ClickModalPost diaryDay={diaryDay}>
                <PostContent>+</PostContent>
              </ClickModalPost>
            </ContentBox>
          )}
        </Container>
      </Wrap>
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

const Wrap = styled.div`
  display: flex;
  position: absolute;
  right: ${({ side }: Partial<DayProps>) => (side ? "0%" : "-100%")};
  animation: ${({ side }: Partial<DayProps>) => (side ? OpenBox : CloseBox)} 0.5s ease;
`;
const Container = styled.div`
  width: 27vw;
  height: 100vh;
  background-color: #e5dfd3;
  box-sizing: border-box;
  padding: 60px 10px;
  display: flex;
  flex-direction: column;
`;

const CloseBtn = styled.button`
  margin-top: 20px;
  height: 60px;
  width: 35px;
  color: white;
  background-color: #e5dfd3;
  border-radius: 5px 0 0 5px;
  font-size: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
`;
const ContentBox = styled.div`
  height: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 5%;
  box-sizing: border-box;
  max-width: 22vw;
  width: 22vw;
  height: 80%;
  overflow: hidden;
  word-break: break-all;
  cursor: pointer;
  color: #d0bd95;
`;

const Imoticon = styled.div`
  border-radius: 50%;
  background-color: white;
  padding: 5px;
  min-width: 40px;
  height: 40px;
`;

const PostContent = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 22vw;
  height: 80%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  color: #e5dfd3;
`;

export default Sidebar;
