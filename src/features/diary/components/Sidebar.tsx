import styled, { keyframes } from "styled-components";
import { DayProps } from "../../../data/type/d1";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import { useNavigate } from "react-router-dom";
import { DETAIL_PAGE } from "../../../data/routes/urls";
import ClickModalPost from "./ClickModalPost";
import { MdArrowForwardIos } from "react-icons/md";
import { device, themeColor } from "../../../utils/theme";

const Sidebar = ({ side, setSide, data, diaryDay }: Partial<DayProps>) => {
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

const TabletOpenBox = keyframes`
  from {
    top: 150%;
  }
  to {
    top: 90%;
  }
`;

const MobileOpenBox = keyframes`
  from {
    top: 150%;
  }
  to {
    top: 75%;
  }
`;

const MiniMobileOpenBox = keyframes`
  from {
    top: 150%;
  }
  to {
    top: 60%;
  }
`;

const Wrap = styled.div`
  display: flex;
  right: 0;
  animation: ${({ side }: Partial<DayProps>) => side && OpenBox} 1s ease;
  position: relative;
  ${device.tablet} {
    position: absolute;
    flex-direction: column;
    z-index: 10;
    left: 0;
    display: ${({ side }: Partial<DayProps>) => (side ? "content" : "none")};
    top: ${({ side }: Partial<DayProps>) => (side ? "90%" : "150%")};
    animation: ${({ side }: Partial<DayProps>) => side && TabletOpenBox} 1s ease;
  }
  ${device.mobile} {
    top: ${({ side }: Partial<DayProps>) => (side ? "75%" : "150%")};
    animation: ${({ side }: Partial<DayProps>) => side && MobileOpenBox} 1s ease;
  }
  ${device.miniMobile} {
    top: ${({ side }: Partial<DayProps>) => (side ? "60%" : "150%")};
    animation: ${({ side }: Partial<DayProps>) => side && MiniMobileOpenBox} 1s ease;
  }
`;
const Container = styled.div`
  width: 27vw;
  height: 100vh;
  background-color: ${themeColor.main.oatmeal};
  box-sizing: border-box;
  padding: 60px 10px;
  display: flex;
  flex-direction: column;
  ${device.tablet} {
    padding: 30px 10px;
    width: 100vw;
    height: 400px;
    gap: 10px;
  }
  ${device.mobile} {
    height: 400px;
    flex-direction: column;
  }
  ${device.miniMobile} {
    height: 500px;
  }
`;

const CloseBtn = styled.button`
  margin-top: 20px;
  height: 60px;
  width: 35px;
  color: ${themeColor.main.white};
  background-color: ${themeColor.main.oatmeal};
  border-radius: 5px 0 0 5px;
  font-size: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  ${device.tablet} {
    margin-left: 20px;
    position: relative;
    top: 13px;
    transform: rotate(90deg);
  }
`;

const ContentBox = styled.div`
  height: 50%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  ${device.tablet} {
    justify-content: flex-start;
    height: 100%;
  }
  ${device.mobile} {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  background-color: ${themeColor.main.white};
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
  width: 22vw;
  height: 80%;
  overflow: hidden;
  word-break: break-all;
  cursor: pointer;
  color: ${themeColor.main.coffemilk};
  ${device.tablet} {
    width: 87vw;
    height: 100%;
  }
  ${device.mobile} {
    width: 83vw;
  }
  ${device.miniMobile} {
    width: 73vw;
  }
`;

const Imoticon = styled.div`
  border-radius: 50%;
  position: relative;
  background-color: ${themeColor.main.white};
  padding: 5px;
  min-width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const PostContent = styled.div`
  background-color: ${themeColor.main.white};
  border-radius: 5px;
  width: 22vw;
  height: 80%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 700;
  cursor: pointer;
  color: ${themeColor.main.coffemilk};
  ${device.tablet} {
    width: 87vw;
    height: 100%;
  }
  ${device.mobile} {
    width: 83vw;
  }
  ${device.miniMobile} {
    width: 73vw;
  }
`;

export default Sidebar;
