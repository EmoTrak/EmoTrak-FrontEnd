import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDelete } from "../features/detail/hooks/useDelete";
import styled from "styled-components";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import { getCookie } from "../utils/cookies";
import { commentData } from "../data/type/d1";
import LikePost from "../features/community/components/LikePost";
import CreateComment from "../features/community/components/CreateComment";
import Comment from "../features/community/components/Comment";
import useAddCommunityDetail from "../features/community/hooks/useAddCommunityDetail";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "../data/queryKeys/keys";
import { scrollOnTop } from "../utils/scollOnTop";
import PostDate from "../features/community/components/PostDate";
import { DRAW_EDIT_PAGE, IMAGE_EDIT_PAGE } from "../data/routes/urls";
import PageNation from "../components/PageNation";
import Button from "../components/Button";
import Star from "../components/Icon/Star";
import Report from "../features/community/components/Report";
import { GiSiren } from "react-icons/gi";

const CommunityDetail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = getCookie("token");
  const [page, setPage] = useState<number>(1);
  const { deletePost } = useDelete();
  const { data, isError, status, remove } = useAddCommunityDetail(page);

  const deletePostHandler = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deletePost.mutate(id, {
        onSuccess: () => queryClient.resetQueries({ queryKey: [keys.GET_BOARD] }),
      });
    }
  };

  useEffect(() => {
    scrollOnTop();
    return () => {
      remove();
    };
  }, []);

  if (isError) {
    <>에러</>;
  }

  return (
    <Container>
      <StCanvasWrapper>
        {data?.imgUrl ? (
          <Img src={data?.imgUrl} />
        ) : (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4_1Wwmqj8b6SlMR0zLTqg1peTC9-_nHJaQ&usqp=CAU"
            alt="이미지가 없습니다."
          />
        )}
      </StCanvasWrapper>
      <StPostDetailWrapper>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {status === "success" && (
            <LikePost isLike={data.hasLike} id={data.id} count={data.likesCnt} />
          )}
          {!data?.hasReport && !data?.hasAuth && token && (
            <Report id={data?.id} uri="report">
              <Button
                icon
                style={{
                  color: "red",
                  fontSize: "30px",
                }}
              >
                <GiSiren />
              </Button>
            </Report>
          )}
        </div>

        {data?.hasAuth && (
          <div>
            {data?.draw ? (
              <Button
                size="x-small"
                onClick={() => navigate(`${DRAW_EDIT_PAGE}/${data?.id}`)}
              >
                수정
              </Button>
            ) : (
              <Button
                size="x-small"
                onClick={() => navigate(`${IMAGE_EDIT_PAGE}/${data?.id}`)}
              >
                수정
              </Button>
            )}
            <Button size="x-small" onClick={() => deletePostHandler(data?.id)}>
              삭제
            </Button>
          </div>
        )}
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100px",
            }}
          >
            <EmotionIcons
              height="50"
              width="50"
              emotionTypes={`EMOTION_${data?.emoId}`}
            />
          </div>
          <h1>
            감정점수
            {Array(5)
              .fill(null)
              .map((_, i) =>
                i < data?.star ? (
                  <Star key={i} size="30" color={"#FFDC82"} />
                ) : (
                  <Star key={i} size="30" color={"#E5DFD3"} />
                )
              )}
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {status === "success" && <PostDate date={data.date} />}
          </div>
        </div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "30px",
          }}
        >
          닉네임 :{data?.nickname}
        </h2>
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            border: "1px solid lightgray",
          }}
        >
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "20px",
              width: "40vw",
            }}
          >
            {data?.detail}
          </p>
        </div>

        {token && <CreateComment id={data?.id} />}

        {status === "success" &&
          data.comments.map((item: commentData, i: number) => (
            <Comment item={item} key={i} />
          ))}
        {status === "success" && (
          <PageNation
            page={page}
            setPage={setPage}
            totalCount={data.totalComments}
            size={20}
          />
        )}
      </StPostDetailWrapper>
    </Container>
  );
};

export default CommunityDetail;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  position: relative;
  height: 100%;
`;
const StCanvasWrapper = styled.div`
  position: relative;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: sticky;
  top: 150px;
  left: 20px;
`;

const StPostDetailWrapper = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Img = styled.img`
  width: 90%;
`;
