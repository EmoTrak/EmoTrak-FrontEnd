import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useState } from "react";
import { keys } from "../data/queryKeys/keys";
import user from "../lib/api/user";
import { useNavigate, useParams } from "react-router-dom";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import Flex from "../components/Flex";
import { StCanvasWrapper } from "../features/post/components/Canvas";
import { getCookie, removeCookie } from "../utils/cookies";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  DETAIL_PAGE,
  DRAW_EDIT_PAGE,
  IMAGE_EDIT_PAGE,
  LOGIN_PAGE,
} from "../data/routes/urls";
import { useDelete } from "../features/detail/hooks/useDelete";
// import Star from "../components/Icon/Star";
import styled from "styled-components";
import DeleteConfirmModal from "../features/detail/components/DeleteConfirmModal";

interface PositionProps {
  url?: string;
}

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

const Detail = (): JSX.Element => {
  const params = useParams();
  const dailyId: number = Number(params.id);
  const navigate = useNavigate();
  const token = getCookie("token");
  useEffect(() => {
    if (!token || token === "undefined") {
      if (token) {
        removeCookie("token");
        alert("로그인이 필요합니다 !");
        navigate(`${LOGIN_PAGE}`);
      }
    }
    getDetail();
  }, [token]);

  const { deletePost } = useDelete();

  const getDetail = useCallback(() => {
    return user.get(`daily/${dailyId}`);
  }, [dailyId]);

  const { data, isLoading, isError } = useQuery(
    [`${keys.GET_DETAIL}`],
    getDetail,
    {
      retry: 0,
    }
  );

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

  if (isError) {
    alert("삭제된 게시물입니다!");
    navigate("/");
  }
  if (isLoading) {
    return <div>로딩중..</div>;
  }

  return (
    <div>
      <Flex row>
        <BackWrap>
          <button onClick={() => navigate(-1)}>
            <AiOutlineLeft fontSize="40px" />
          </button>
        </BackWrap>
        <StCanvasWrapper>
          <CanvasWrap>
            {targetItem?.imgUrl ? (
              <StDetailImageBox>
                <StDetailImage src={targetItem?.imgUrl} alt="" />
              </StDetailImageBox>
            ) : (
              <StDetailImageBox>
                <StDefaultImage>이미지가 필요합니다</StDefaultImage>
              </StDetailImageBox>
            )}
          </CanvasWrap>
        </StCanvasWrapper>
        <StCanvasWrapper>
          <Wrapper style={{ backgroundColor: "white" }}>
            <Flex>
              <EmoMoveBtn>
                {contents?.length < 2 || dailyId <= otherItem?.id ? (
                  <button disabled>
                    <AiOutlineLeft />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`${DETAIL_PAGE}/${otherItem.id}`)}
                  >
                    <AiOutlineLeft />
                  </button>
                )}
                {contents?.length < 2 || dailyId >= otherItem?.id ? (
                  <button disabled>
                    <AiOutlineRight />
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`${DETAIL_PAGE}/${otherItem.id}`)}
                  >
                    <AiOutlineRight />
                  </button>
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
                <Flex row>
                  <div></div>
                  <h3
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      fontSize: "30px",
                    }}
                  >
                    내 감정점수
                    {targetItem?.star}
                  </h3>
                </Flex>
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
                <div>
                  <button onClick={navigateEditHandler}>수정</button>
                </div>
                <div>
                  <button>
                    <DeleteConfirmModal itemId={targetItem?.id}>
                      삭제
                    </DeleteConfirmModal>
                  </button>
                </div>
              </DetailBtnWrap>
            </Flex>
          </Wrapper>
        </StCanvasWrapper>
      </Flex>
    </div>
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

const BackWrap = styled.div`
  height: 10vh;
  margin-left: 50px;
  button {
    height: 10vh;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
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
    background-color: #F4F2EE;
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
  width: 50vw;
  height: 80vh;
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
  margin-left: 50px;
`;
const EmoMoveBtn = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
