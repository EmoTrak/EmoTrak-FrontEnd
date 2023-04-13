import { useState } from "react";
import Flex from "../components/Flex";
import { useNavigate } from "react-router-dom";
import { EDIT_PAGE } from "../data/routes/urls";
import { useDelete } from "../features/detail/hooks/useDelete";
import styled from "styled-components";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import { getCookie } from "../utils/cookies";
import useAddCommunityDetail from "../features/community/hooks/useAddCommunityDetail";
import Comment from "../features/community/components/Comment";
import { commentData } from "../data/type/d1";
import Report from "../features/community/components/Report";
import CreateComment from "../features/community/components/CreateComment";
import LikePost from "../features/community/components/LikePost";

const CommunityDetail = (): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const { deletePost } = useDelete();
  const token = getCookie("token");

  const { data, isError, isLoading, status } = useAddCommunityDetail(page);

  const deletePostHandler = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deletePost.mutate(id);
    }
  };

  if (isLoading) {
    <>로딩중</>;
  }
  if (isError) {
    <>게시글을 불러올 수 없습니다</>;
  }

  return (
    <Flex row>
      <StCanvasWrapper>
        {data?.imgUrl ? (
          <Img src={data?.imgUrl} alt="" />
        ) : (
          <StDefaultImage>이미지가 필요합니다</StDefaultImage>
        )}
      </StCanvasWrapper>
      <StCanvasWrapper2>
        <Flex>
          {status === "success" && (
            <LikePost isLike={data.hasLike} id={data.id} count={data.likesCnt} />
          )}
          <Flex row>
            이모티콘
            <EmotionIcons
              height="50"
              width="50"
              emotionTypes={`EMOTION_${data?.emoId}`}
            />
            <div>닉네임 :{data?.nickname}</div>
          </Flex>
          <Flex row>내 감정점수 {data?.star}</Flex>
          <Flex row>{data?.detail}</Flex>
          {data?.hasAuth && (
            <div>
              <button onClick={() => navigate(`${EDIT_PAGE}/${data?.id}`)}>수정</button>
              <button onClick={() => deletePostHandler(data?.id)}>삭제</button>
            </div>
          )}
        </Flex>

        {token && (
          <>
            <CreateComment id={data?.id} />
            <Report id={data?.id} uri="report">
              <button>신고하기</button>
            </Report>
          </>
        )}
        {data?.comments.map((item: commentData, i: number) => (
          <Comment item={item} key={i} />
        ))}
      </StCanvasWrapper2>
    </Flex>
  );
};

export default CommunityDetail;

const StDefaultImage = styled.div`
  width: 50vw;
  border: 1px solid;
`;

const StCanvasWrapper = styled.div`
  width: 50%;
  height: 70vh;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`;

const StCanvasWrapper2 = styled.div`
  width: 50%;
  height: 70vh;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  position: relative;
`;
const Img = styled.img`
  width: 40vw;
  position: absolute;
`;
