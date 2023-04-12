import React, { useState } from 'react';
import Flex from '../components/Flex';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_PAGE } from '../data/routes/urls';
import { useDelete } from '../features/detail/hooks/useDelete';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import EmotionIcons from '../components/Icon/EmoticonIcons';
import user from '../lib/api/user';
import { keys } from '../data/queryKeys/keys';
import Comment from '../features/community/components/Comment';
import { getCookie } from '../utils/cookies';

const CommunityDetail = (): JSX.Element => {
  const param = useParams();
  const [page, setPage] = useState<number>(0);
  const dailyId: number = Number(param.id);
  const navigate = useNavigate();
  const { deletePost } = useDelete();
  const token = getCookie('token');

  const { data, isError } = useQuery({
    queryKey: [keys.GET_BOARD, page],
    queryFn: async () => {
      const data = await user.get(`/boards/${dailyId}`, { params: page });
      return data.data.data;
    },
  });

  const deletePostHandler = (id: number) => {
    if (window.confirm('삭제하시겠습니까?')) {
      deletePost.mutate(id);
    }
  };

  // if (isLoading) {
  //   <>로딩중..</>;
  // }
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
          <Flex row>
            이모티콘
            <EmotionIcons
              height="50"
              width="50"
              emotionTypes={`EMOTION_${data?.emoId}`}
            />
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

        {token && <Comment id={data?.id} commentData={data?.comments} />}
      </StCanvasWrapper2>
    </Flex>
  );
};

export default CommunityDetail;

const StDefaultImage = styled.div`
  width: 50vw;
  /* height: 500px; */
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
