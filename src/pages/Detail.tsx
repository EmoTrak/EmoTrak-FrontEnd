import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { keys } from "../data/queryKeys/keys";
import user from "../lib/api/user";
import { useNavigate, useParams } from "react-router-dom";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import Flex from "../components/Flex";
import { StCanvasWrapper } from "../features/post/components/Canvas";
import { getCookie, removeCookie } from "../utils/cookies";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { DETAIL_PAGE, DRAW_EDIT_PAGE, IMAGE_EDIT_PAGE } from "../data/routes/urls";
import styled from "styled-components";
import DeleteConfirmModal from "../features/detail/components/DeleteConfirmModal";
import Button from "../components/Button";
import Star from "../components/Icon/Star";

export type DetailType = {
  id: number;
  day: number;
  emoId: number;
  star: number;
  detail: string;
  imgUrl: string | null;
  restrict: boolean;
  share: boolean;
  draw: boolean;
};

const Detail = () => {
  const params = useParams();
  const dailyId: number = Number(params.id);
  const navigate = useNavigate();
  const token = getCookie("token");
  // useEffect(() => {
  //   if (!token || token === "undefined") {
  //     if (token) {
  //       removeCookie("token");
  //       alert("로그인이 필요합니다 !");
  //       navigate("/");
  //     }
  //   }
  //   getDetail();
  // }, [token]);

  const getDetail = useCallback(() => {
    return user.get(`daily/${dailyId}`);
  }, [dailyId]);

  const { data, isLoading } = useQuery([`${keys.GET_DETAIL}`], getDetail);

  const contents = data?.data.data.contents;
  const otherItem = contents?.filter((item: DetailType) => item.id !== dailyId)[0];
  const targetItem = contents?.filter((item: DetailType) => item.id === dailyId)[0];

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
        <Button icon size="x-small" onClick={() => navigate(-1)}>
          <AiOutlineLeft fontSize="40px" />
        </Button>
      </BackWrap>
      <StCanvasWrapper>
        <CanvasWrap>
          <StDetailImageBox>
            {targetItem?.imgUrl ? (
              <StDetailImage src={targetItem?.imgUrl} alt="" />
            ) : (
              <StDefaultImage>이미지가 필요합니다</StDefaultImage>
            )}
          </StDetailImageBox>
        </CanvasWrap>
      </StCanvasWrapper>
      <StCanvasWrapper>
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
                  style={{ fontSize: "30px", color: "#787878" }}
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
                  style={{ fontSize: "30px", color: "#787878" }}
                >
                  <AiOutlineRight />
                </Button>
              )}
            </EmoMoveBtn>
            <DetailEmoWrap>
              <Flex row>
                <></>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "50px",
                  }}
                >
                  <EmotionIcons
                    height="50"
                    width="50"
                    emotionTypes={`EMOTION_${targetItem?.emoId}`}
                  />
                </div>
              </Flex>
              <div>
                <h3
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "30px",
                  }}
                >
                  내 감정점수
                  {Array(5)
                    .fill(null)
                    .map((_, i) =>
                      i < targetItem?.star ? (
                        <Star key={i} size="30" color={"#FFDC82"} />
                      ) : (
                        <Star key={i} size="30" color={"#E5DFD3"} />
                      )
                    )}
                </h3>
              </div>
            </DetailEmoWrap>
            <div style={{ marginLeft: "50px" }}>
              <Flex row>
                <div>공유여부:&nbsp;</div>
                {targetItem?.share ? "Shared" : "NoShared"}
              </Flex>
            </div>
            <DetailText>
              <DetailWrapper>{targetItem?.detail}</DetailWrapper>
            </DetailText>
            <DetailBtnWrap>
              <Button size="x-large" onClick={navigateEditHandler}>
                수정
              </Button>
              <Button
                size="x-large"
                style={{ backgroundColor: "#F89790", color: "white" }}
              >
                <DeleteConfirmModal itemId={targetItem?.id}>삭제</DeleteConfirmModal>
              </Button>
            </DetailBtnWrap>
          </Flex>
        </Wrapper>
      </StCanvasWrapper>
    </Container>
  );
};

export default Detail;

const DetailText = styled.div`
  display: flex;
  justify-content: center;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-color: #ae9898;
  height: 50vh;
`;

const Container = styled.div`
  display: flex;
  background-color: white;
  margin-top: 100px;
  padding-top: 1%;
`;

const BackWrap = styled.div`
  position: absolute;
  left: 2%;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const DetailWrapper = styled.div`
  background-size: cover;
  display: flex;
  overflow: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    /* 스크롤이 움직이는 영역  */
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    /*  스크롤  */
    background-color: #f4f2ee;
    border-radius: 30px;
  }
  background-color: #fff;
  padding: 10px;
  width: 90%;
  font-size: 25px;
`;

const CanvasWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
`;
const StDefaultImage = styled.div`
  border: 1px solid;
`;

const StDetailImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StDetailImageBox = styled.div`
  width: 80vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DetailEmoWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const DetailBtnWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 50px;
  width: 100%;
`;
const EmoMoveBtn = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
