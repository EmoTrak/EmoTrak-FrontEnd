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
import PageNation from "../components/PageNation";
import { GiSiren } from "react-icons/gi";

const CommunityDetail = (): JSX.Element => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = getCookie("token");
  const [page, setPage] = useState<number>(1);
  const { deletePost } = useDelete();
  const { data, isError, status, remove } = useAddCommunityDetail(page);

  const deletePostHandler = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deletePost.mutate(id, {
        onSuccess: () =>
          queryClient.resetQueries({ queryKey: [keys.GET_BOARD] }),
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
          <StDefaultImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4_1Wwmqj8b6SlMR0zLTqg1peTC9-_nHJaQ&usqp=CAU"
            alt="이미지가 없습니다."
          />
        )}
      </StCanvasWrapper>
      <StPostDetailWrapper>
        <div style={{ width: "50vw" }}>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {status === "success" && (
                <LikePost
                  isLike={data.hasLike}
                  id={data.id}
                  count={data.likesCnt}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!data?.hasReport && !data?.hasAuth && (
                <Report id={data?.id} uri="report">
                  <button style={{color:'red', fontSize:'30px', border:'none', backgroundColor:'transparent', cursor:'pointer'}}>
                    <GiSiren/>
                  </button>
                </Report>
              )}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-evenly",
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
              <h1
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                내 감정점수 {data?.star}
              </h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div></div>
                {status === "success" && <PostDate date={data.date} />}
              </div>
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
                width: "100vw",
              }}
            >
              {data?.detail}
            </p>
          </div>
          {token && (
            <>
              <CreateComment id={data?.id} />
            </>
          )}
          <div>
            {data?.hasAuth && (
              <div>
                {data?.draw ? (
                  <button
                    onClick={() => navigate(`${DRAW_EDIT_PAGE}/${data?.id}`)}
                  >
                    수정
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`${IMAGE_EDIT_PAGE}/${data?.id}`)}
                  >
                    수정
                  </button>
                )}
                <button onClick={() => deletePostHandler(data?.id)}>
                  삭제
                </button>
              </div>
            )}
          </div>
          <div></div>
        </div>

        {status === "success" &&
          data.comments.map((item: commentData, i: number) => (
            <Comment item={item} key={i} />
          ))}
        {status === "success" && (
          <PageNation
            page={page}
            setPage={setPage}
            totalCount={data.totalComments}
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
  align-items: flex-start;
  position: relative;

  height: 100%;
`;
const StCanvasWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: sticky;
  top: 150px;
  left: 20px;
`;

const StDefaultImage = styled.img`
  width: 90%;
`;

const StPostDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const Img = styled.img`
  width: 90%;
`;
