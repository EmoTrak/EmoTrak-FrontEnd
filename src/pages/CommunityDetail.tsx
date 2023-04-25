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
import { COMMUNITY_PAGE, DRAW_EDIT_PAGE, IMAGE_EDIT_PAGE } from "../data/routes/urls";
import PageNation from "../components/PageNation";
import Button from "../components/Button";
import Star from "../components/Icon/Star";
import Report from "../features/community/components/Report";
import { RiAlarmWarningFill } from "react-icons/ri";
import { themeColor } from "../utils/theme";
import { device } from "../utils/theme";
import Flex from "../components/Flex";

const CommunityDetail = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");
  const [page, setPage] = useState<number>(1);
  const { deletePost } = useDelete();
  const { data, isError, status, remove } = useAddCommunityDetail(page);

  const deletePostHandler = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deletePost.mutate(id, {
        onSuccess: () => {
          navigate(COMMUNITY_PAGE);
          queryClient.resetQueries({ queryKey: [keys.GET_BOARD] });
        },
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
      <ImageWrapper>
        {data?.imgUrl ? (
          <Img src={data?.imgUrl} />
        ) : (
          <Img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4_1Wwmqj8b6SlMR0zLTqg1peTC9-_nHJaQ&usqp=CAU"
            alt="이미지가 없습니다."
          />
        )}
      </ImageWrapper>

      <PostDetailWrapper>
        <Flex row ai="center">
          {status === "success" && (
            <LikePost isLike={data.hasLike} id={data.id} count={data.likesCnt} />
          )}
          {!data?.hasReport && !data?.hasAuth && refreshToken && (
            <Report id={data?.id} uri="report">
              <Button
                icon
                style={{
                  color: "red",
                  fontSize: "25px",
                }}
              >
                <RiAlarmWarningFill />
              </Button>
            </Report>
          )}
        </Flex>

        {data?.hasAuth && (
          <>
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
          </>
        )}
        <Flex ai="center" row gap={5}>
          <Emoticon>
            <EmotionIcons
              height="100%"
              width="100%"
              emotionTypes={`EMOTION_${data?.emoId}`}
            />
          </Emoticon>
          <EmotionalScore>감정점수</EmotionalScore>
          <EmotionStar>
            {Array(5)
              .fill(null)
              .map((_, i) =>
                i < data?.star ? (
                  <Star key={i} size="20" color={themeColor.palette.yellow} />
                ) : (
                  <Star key={i} size="20" color={themeColor.main.oatmeal} />
                )
              )}
          </EmotionStar>
        </Flex>
        <div
          style={{
            fontSize: "25px",
          }}
        >
          닉네임 :{data?.nickname}
        </div>
        {status === "success" && <PostDate date={data.date} />}
        <PostContent>{data?.detail}</PostContent>

        {refreshToken && <CreateComment id={data?.id} />}

        {status === "success" && (
          <>
            {data.comments.map((item: commentData, i: number) => (
              <Comment item={item} key={i} />
            ))}
            <PageNation
              page={page}
              setPage={setPage}
              totalCount={data.totalComments}
              size={20}
            />
          </>
        )}
      </PostDetailWrapper>
    </Container>
  );
};

export default CommunityDetail;

const Container = styled.div`
  width: 100vw;
  display: flex;
  position: relative;
  justify-content: space-around;
  background-color: ${themeColor.main.white};
  ${device.mobile} {
    flex-direction: column;
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 50vw;
  margin-top: 50px;
  margin-bottom: 50px;

  ${device.mobile} {
    position: relative;
    top: 30px;
    left: 5%;
    margin: 10px auto 50px auto;
    width: 100%;
  }
  ${device.miniMobile} {
    left: 1%;
  }
`;

const PostDetailWrapper = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  ${device.mobile} {
    width: 100vw;
  }
`;

const Img = styled.img`
  top: 150px;
  left: 20px;
  width: 90%;
  border-radius: 10%;
  position: sticky;
`;

const Emoticon = styled.div`
  width: 25px;
`;

const EmotionalScore = styled.div`
  font-size: 18px;
`;

const EmotionStar = styled.div`
  min-width: 160px;
`;

const PostContent = styled.div`
  width: 40vw;
  margin-top: 30px;
  margin-bottom: 30px;
  text-decoration: underline;
  text-underline-position: under;
  text-decoration-color: ${themeColor.main.chocomilk};
  ${device.mobile} {
    width: 80%;
  }
`;
