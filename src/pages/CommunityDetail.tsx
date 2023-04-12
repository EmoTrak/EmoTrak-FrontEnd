import { useState } from "react";
import Flex from "../components/Flex";
import { useNavigate } from "react-router-dom";
import { EDIT_PAGE } from "../data/routes/urls";
import { useDelete } from "../features/detail/hooks/useDelete";
import styled from "styled-components";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import Comment from "../features/community/components/CreateComment";
import { getCookie } from "../utils/cookies";
import useAddCommunityDetail from "../features/community/hooks/useAddCommunityDetail";
import LikePost from "../features/community/components/LikePost";
import CommentEdit from "../features/community/components/Comment";
import { commentData } from "../data/type/d1";
import Report from "../features/community/components/Report";

const CommunityDetail = (): JSX.Element => {
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const { deletePost } = useDelete();
  const token = getCookie("token");

  const { data, isError } = useAddCommunityDetail(page);

  const deletePostHandler = (id: number) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deletePost.mutate(id);
    }
  };

  if (isError) {
    <>게시글을 불러올 수 없습니다</>;
  }
  console.log(data);
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
          <LikePost
            hasLike={data?.hasLike}
            id={data?.id}
            count={data?.boardLikesCnt}
            uri="likes"
          />
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
            <Comment id={data?.id} />
            <Report>
              <button>신고하기</button>
            </Report>
          </>
        )}
        {data?.comments.map((item: commentData, i: number) => (
          <CommentEdit item={item} key={i} />
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
