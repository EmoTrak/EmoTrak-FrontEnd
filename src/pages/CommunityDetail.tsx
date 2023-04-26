import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDelete } from "../features/detail/hooks/useDelete";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import { getCookie } from "../utils/cookies";
import { CommentData } from "../data/type/type";
import LikePost from "../features/community/components/LikePost";
import CreateComment from "../features/community/components/CreateComment";
import Comment from "../features/community/components/Comment";
import useAddCommunityDetail from "../features/community/hooks/useAddCommunityDetail";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "../data/queryKeys/keys";
import { scrollOnTop } from "../utils/scollOnTop";
import PostDate from "../features/community/components/PostDate";
import {
  COMMUNITY_PAGE,
  DRAW_EDIT_PAGE,
  IMAGE_EDIT_PAGE,
} from "../data/routes/urls";
import PageNation from "../components/PageNation";
import Button from "../components/Button";
import Star from "../components/Icon/Star";
import Report from "../features/community/components/Report";
import { RiAlarmWarningFill } from "react-icons/ri";
import { themeColor } from "../utils/theme";
import Flex from "../components/Flex";
import DeleteConfirmModal from "../features/detail/components/DeleteConfirmModal";
import * as St from "../features/community/styles/CommunityDetailStyle";

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
    <St.Container>
      <St.ImageWrapper>
        {data?.imgUrl ? (
          <St.Img src={data?.imgUrl} />
        ) : (
          <St.Img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy4_1Wwmqj8b6SlMR0zLTqg1peTC9-_nHJaQ&usqp=CAU"
            alt="이미지가 없습니다."
          />
        )}
      </St.ImageWrapper>

      <St.PostDetailWrapper>
        <Flex row ai="center">
          {status === "success" && (
            <LikePost
              isLike={data.hasLike}
              id={data.id}
              count={data.likesCnt}
            />
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
          <Flex row>
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
            <DeleteConfirmModal itemId={data?.id}>
              <Button size="x-small">삭제</Button>
            </DeleteConfirmModal>
          </Flex>
        )}
        <Flex ai="center" row gap={5}>
          <St.Emoticon>
            <EmotionIcons
              height="100%"
              width="100%"
              emotionTypes={`EMOTION_${data?.emoId}`}
            />
          </St.Emoticon>
          <St.EmotionalScore>감정점수</St.EmotionalScore>
          <St.EmotionStar>
            {Array(5)
              .fill(null)
              .map((_, i) =>
                i < data?.star ? (
                  <Star key={i} size="25px" color={themeColor.palette.yellow} />
                ) : (
                  <Star key={i} size="25px" color={themeColor.main.oatmeal} />
                )
              )}
          </St.EmotionStar>
        </Flex>
        <div
          style={{
            fontSize: "25px",
          }}
        >
          닉네임 :{data?.nickname}
        </div>
        {status === "success" && <PostDate date={data.date} />}
        <St.PostContent>{data?.detail}</St.PostContent>

        {refreshToken && <CreateComment id={data?.id} />}

        {status === "success" && (
          <>
            {data.comments.map((item: CommentData, i: number) => (
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
      </St.PostDetailWrapper>
    </St.Container>
  );
};

export default CommunityDetail;
