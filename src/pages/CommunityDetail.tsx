import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiAlarmWarningFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { CommentData } from "../data/type/type";
import { DETAIL_PAGE } from "../data/routes/urls";
import { getCookie } from "../utils/cookies";
import { themeColor } from "../utils/theme";
import { scrollOnTop } from "../utils/scollOnTop";
import { BackOfPage } from "../layouts/LayoutStyle";
import PageNation from "../components/PageNation";
import Flex from "../components/Flex";
import Star from "../components/Icon/Star";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import LikePost from "../features/community/components/LikePost";
import CreateComment from "../features/community/components/CreateComment";
import Comment from "../features/community/components/Comment";
import useAddCommunityDetail from "../features/community/hooks/useAddCommunityDetail";
import PostDate from "../features/community/components/PostDate";
import Report from "../features/community/components/Report";
import * as St from "../features/community/styles/CommunityDetailStyle";

const CommunityDetail = () => {
  const navigate = useNavigate();
  const refreshToken = getCookie("refreshToken");
  const [page, setPage] = useState<number>(1);
  const { data, status, remove } = useAddCommunityDetail(page);

  useEffect(() => {
    scrollOnTop();
    return () => {
      remove();
    };
  }, []);

  return (
    <St.Container>
      <BackOfPage onClick={() => navigate(-1)}>
        <IoIosArrowBack />
      </BackOfPage>
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
        {/* {data?.hasAuth && (
          <Flex row>
            {data?.draw ? (
              <Button
                size="x-small"
                onClick={() => navigate(`${DRAW_EDIT_PAGE}/${data.id}`)}
              >
                수정
              </Button>
            ) : (
              <Button
                size="x-small"
                onClick={() => navigate(`${IMAGE_EDIT_PAGE}/${data.id}`)}
              >
                수정
              </Button>
            )}
            <DeleteConfirmModal itemId={data?.id}>
              <Button size="x-small" important>
                삭제
              </Button>
            </DeleteConfirmModal>
          </Flex>
        )} */}
        <Flex ai="center" row gap={5} jc="center">
          <St.Emoticon>
            <EmotionIcons
              height="100%"
              width="100%"
              emotionTypes={`EMOTION_${data?.emoId}`}
            />
          </St.Emoticon>
          <St.EmotionalScore>감정점수</St.EmotionalScore>
          <Flex row gap={15}>
            {Array(5)
              .fill(null)
              .map((_, i) =>
                i < data?.star ? (
                  <Star key={i} size="25px" color={themeColor.palette.yellow} />
                ) : (
                  <Star key={i} size="25px" color={themeColor.main.oatmeal} disabled />
                )
              )}
          </Flex>
        </Flex>
        <div>
          <Flex row ai="center" jc="space-between">
            <Flex row ai="center">
              <St.Nickname>{data?.nickname}</St.Nickname>
              {status === "success" && <PostDate date={data.date} />}
            </Flex>
            {status === "success" && (
              <LikePost isLike={data.hasLike} id={data.id} count={data.likesCnt} />
            )}
          </Flex>
        </div>

        <St.PostContent>{data?.detail}</St.PostContent>
        <Flex row jc="flex-end">
          {!data?.hasReport && !data?.hasAuth && refreshToken && (
            <Report id={data?.id} uri="report">
              <RiAlarmWarningFill />
            </Report>
          )}
          {data?.hasAuth && (
            <St.DiaryText onClick={() => navigate(`${DETAIL_PAGE}/${data?.id}`)}>
              내 일기장 보러가기
            </St.DiaryText>
          )}
        </Flex>
        <CreateComment id={data?.id} />

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
