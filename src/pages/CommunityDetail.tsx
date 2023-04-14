import { useEffect, useState } from "react";
import Flex from "../components/Flex";
import { useNavigate } from "react-router-dom";
import { useDelete } from "../features/detail/hooks/useDelete";
import styled from "styled-components";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import { getCookie } from "../utils/cookies";
import { commentData } from "../data/type/d1";
import LikePost from "../features/community/components/LikePost";
import CreateComment from "../features/community/components/CreateComment";
import Report from "../features/community/components/Report";
import Comment from "../features/community/components/Comment";
import useAddCommunityDetail from "../features/community/hooks/useAddCommunityDetail";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "../data/queryKeys/keys";
import { scrollOnTop } from "../utils/scollOnTop";
import PostDate from "../features/community/components/PostDate";
import { DRAW_EDIT_PAGE, IMAGE_EDIT_PAGE } from "../data/routes/urls";

const CommunityDetail = (): JSX.Element => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = getCookie("token");
  const [page, setPage] = useState<number>(1);
  const { deletePost } = useDelete();
  const { data, isLoading, status } = useAddCommunityDetail(page);

  const deletePostHandler = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deletePost.mutate(id, {
        onSuccess: () => queryClient.resetQueries({ queryKey: [keys.GET_BOARD] }),
      });
    }
  };

  useEffect(() => {
    scrollOnTop();
  }, []);

  if (isLoading) {
    <>로딩중</>;
  }

  return (
    <Container>
      <StCanvasWrapper>
        {data?.imgUrl ? (
          <Img src={data?.imgUrl} />
        ) : (
          <StDefaultImage>이미지가 필요합니다</StDefaultImage>
        )}
      </StCanvasWrapper>
      <StPostDetailWrapper>
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
          {status === "success" && <PostDate date={data.date} />}
          <Flex row>{data?.detail}</Flex>
          {data?.hasAuth && (
            <div>
              {data?.draw ? (
                <button onClick={() => navigate(`${DRAW_EDIT_PAGE}/${data?.id}`)}>
                  수정
                </button>
              ) : (
                <button onClick={() => navigate(`${IMAGE_EDIT_PAGE}/${data?.id}`)}>
                  수정
                </button>
              )}
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
        {status === "success" &&
          data.comments.map((item: commentData, i: number) => (
            <Comment item={item} key={i} />
          ))}
        {page !== 1 && (
          <button onClick={() => setPage((pre) => pre - 1)}>{page - 1}</button>
        )}
        <button onClick={() => setPage((pre) => pre + 1)} disabled={data?.lastPage}>
          {data?.lastPage ? page : page + 1}
        </button>
      </StPostDetailWrapper>
    </Container>
  );
};

export default CommunityDetail;

const Container = styled.div`
  display: flex;
  margin-top: 120px;
`;

const StDefaultImage = styled.div`
  width: 50vw;
  border: 1px solid;
`;

const StCanvasWrapper = styled.div`
  width: 50%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
`;

const StPostDetailWrapper = styled.div`
  width: 50%;
  height: 100%;
  max-height: 90vh;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  overflow: scroll;
  ::-webkit-scrollbar-thumb {
    background-color: red;
  }
`;
const Img = styled.img`
  width: 40vw;
  /* position: fixed; */
  /* top: 20%; */
  /* left: 5vw; */
`;
