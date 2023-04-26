import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { keys } from "../data/queryKeys/keys";
import user from "../lib/api/user";
import { useNavigate, useParams } from "react-router-dom";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import Flex from "../components/Flex";
import { getCookie } from "../utils/cookies";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  DETAIL_PAGE,
  DRAW_EDIT_PAGE,
  HOME_PAGE,
  IMAGE_EDIT_PAGE,
} from "../data/routes/urls";
import styled from "styled-components";
import DeleteConfirmModal from "../features/detail/components/DeleteConfirmModal";
import Button from "../components/Button";
import Star from "../components/Icon/Star";
import { device, themeColor } from "../utils/theme";
import { DetailType } from "../data/type/type";

const Detail = () => {
  const params = useParams();
  const dailyId: number = Number(params.id);
  const navigate = useNavigate();

  const getDetail = useCallback(() => {
    return user.get(`daily/${dailyId}`);
  }, [dailyId]);

  const { data, isLoading } = useQuery([`${keys.GET_DETAIL}`], getDetail);

  const contents = data?.data.data.contents;
  const otherItem = contents?.filter(
    (item: DetailType) => item.id !== dailyId
  )[0];
  const targetItem = contents?.filter(
    (item: DetailType) => item.id === dailyId
  )[0];

  const navigateEditHandler = () => {
    if (targetItem?.draw === true) {
      navigate(`${DRAW_EDIT_PAGE}/${targetItem?.id}`);
    }
    if (targetItem?.draw === false) {
      navigate(`${IMAGE_EDIT_PAGE}/${targetItem?.id}`);
    }
  };

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <Container>
      <BackWrap>
        <Button icon size="x-small" onClick={() => navigate(HOME_PAGE)}>
          <AiOutlineLeft fontSize="40px" />
        </Button>
      </BackWrap>
      <CanvasWrap>
        <StDetailImageBox>
          {targetItem?.imgUrl ? (
            <StDetailImage src={targetItem?.imgUrl} alt="" />
          ) : (
            <StDefaultImage>이미지가 필요합니다</StDefaultImage>
          )}
        </StDetailImageBox>
      </CanvasWrap>
      <Wrapper>
        <Flex>
          <EmoMoveBtn>
            {contents?.length < 2 || dailyId <= otherItem?.id ? (
              <Button icon disabled style={{ fontSize: "30px" }}>
                <AiOutlineLeft />
              </Button>
            ) : (
              <Button
                icon
                onClick={() => navigate(`${DETAIL_PAGE}/${otherItem.id}`)}
                style={{ fontSize: "30px", color: `${themeColor.main.gray}` }}
              >
                <AiOutlineLeft />
              </Button>
            )}
            {contents?.length < 2 || dailyId >= otherItem?.id ? (
              <Button icon disabled style={{ fontSize: "30px" }}>
                <AiOutlineRight />
              </Button>
            ) : (
              <Button
                icon
                onClick={() => navigate(`${DETAIL_PAGE}/${otherItem.id}`)}
                style={{ fontSize: "30px", color: `${themeColor.main.gray}` }}
              >
                <AiOutlineRight />
              </Button>
            )}
          </EmoMoveBtn>
          <DetailEmoWrap>
            <EmoIconWrap>
              <EmotionIcons
                height="50"
                width="50"
                emotionTypes={`EMOTION_${targetItem?.emoId}`}
              />
            </EmoIconWrap>
            <EmoScore>
              <h3>내 감정점수</h3>
              <EmoStar>
                {Array(5)
                  .fill(null)
                  .map((_, i) =>
                    i < targetItem?.star ? (
                      <Star
                        key={i}
                        size="30px"
                        color={themeColor.palette.yellow}
                      />
                    ) : (
                      <Star
                        key={i}
                        size="30px"
                        color={themeColor.main.oatmeal}
                      />
                    )
                  )}
              </EmoStar>
            </EmoScore>
          </DetailEmoWrap>
          <SharedWrap>
            <Flex row>
              <div>공유여부:&nbsp;</div>
              {targetItem?.share ? "Shared" : "NoShared"}
            </Flex>
          </SharedWrap>
          <DetailText>
            <DetailWrapper>{targetItem?.detail}</DetailWrapper>
          </DetailText>
          <DetailBtnWrap>
            <Button size="x-large" onClick={navigateEditHandler}>
              수정
            </Button>
            <Button
              size="x-large"
              style={{
                backgroundColor: `${themeColor.emoticon.pink}`,
                color: `${themeColor.main.white}`,
              }}
            >
              <DeleteConfirmModal itemId={targetItem?.id}>
                삭제
              </DeleteConfirmModal>
            </Button>
          </DetailBtnWrap>
        </Flex>
      </Wrapper>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  display: flex;
  background-color: ${themeColor.main.white};
  padding-top: 1%;
  height: 100%;
  position: relative;
  ${device.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100%;
  }
`;
const CanvasWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  position: relative;
  ${device.mobile} {
  }
`;
const Wrapper = styled.div`
  width: 48vw;
  margin-top: 75px;
  ${device.mobile} {
    margin-top: 10px;
    width: 80vw;
  }
`;

const DetailText = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-color: ${themeColor.main.chocomilk};
  min-height: 50vh;
  ${device.mobile} {
    min-height: 10vh;
    height: 100%;
  }
`;

const SharedWrap = styled.div`
  margin-left: 50px;
  ${device.mobile} {
    margin: 0;
    display: flex;
    justify-content: center;
  }
`;

const BackWrap = styled.div`
  position: absolute;
  left: 2%;
  z-index: 10;
  ${device.mobile} {
    display: none;
  }
`;

const DetailWrapper = styled.div`
  background-size: cover;
  display: flex;
  background-color: ${themeColor.main.white};
  padding: 10px;
  width: 90%;
  font-size: 25px;
`;

const StDefaultImage = styled.div`
  border: 1px solid;
`;

const StDetailImage = styled.img`
  width: 80%;
  top: 100px;
  position: sticky;
  ${device.mobile} {
    width: 90vw;
    border-radius: 10px;
    border: 5px solid ${themeColor.main.oatmeal};
  }
`;

const StDetailImageBox = styled.div`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 50px;
  ${device.mobile} {
    width: 100vw;
    height: 100%;
  }
`;
const DetailEmoWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  ${device.miniMobile} {
    display: flex;
    flex-direction: column;
    h3 {
      margin: 0;
      display: flex;
      justify-content: center;
    }
  }
`;
const DetailBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 50px;
`;
const EmoMoveBtn = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const EmoScore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    margin: 0;
    display: flex;
    justify-content: center;
    font-size: 30px;
  }
  ${device.miniMobile} {
    flex-direction: column;
  }
`;

const EmoStar = styled.div`
  display: flex;
  gap: 15px;
  min-width: 160px;
`;
const EmoIconWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;
