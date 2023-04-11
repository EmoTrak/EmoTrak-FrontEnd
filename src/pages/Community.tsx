import styled from 'styled-components';
import EmotionIcons from '../components/Icon/EmoticonIcons';
import Flex from '../components/Flex';
import { useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { keys } from '../data/queryKeys/keys';
import user from '../lib/api/user';
import useEmoSelect from '../features/community/hooks/useEmoSelect';
import { Image } from '../data/type/d1';

const Community = (): JSX.Element => {
  const { clickEmojiHandler, emoNum } = useEmoSelect();

  const [select, setSelect] = useState({
    page: 1,
    emo: '1,2,3,4,5,6',
    size: 10,
    sort: 'recent',
  });

  const [listOpen, setListOpen] = useState<boolean>(false);

  const clickSelectHandler = (sel: string): void => {
    setSelect({ ...select, sort: sel });
    setListOpen((pre) => !pre);
  };

  const { data, isLoading, isError } = useInfiniteQuery({
    queryKey: [keys.GET_BOARD, select],
    queryFn: async () => {
      const data = await user.get(`/boards`, { params: select });
      return data.data.data;
    },
    // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  if (isLoading) {
    return <>로딩중</>;
  }

  if (isError) {
    return <>에러</>;
  }

  return (
    <Container>
      <SelectBar>
        <Flex>
          <SelectTitle onClick={(): void => setListOpen((pre) => !pre)}>
            {select.sort === 'recent' ? '최신순' : '인기순'}
            <BsCaretDownFill />
          </SelectTitle>
          {listOpen && (
            <Sort>
              <SortListBtn onClick={(): void => clickSelectHandler('recent')}>
                최신순
              </SortListBtn>
              <SortListBtn onClick={(): void => clickSelectHandler('popular')}>
                인기순
              </SortListBtn>
            </Sort>
          )}
        </Flex>

        {new Array(6).fill(null).map((e, i) => (
          <StEmoButton
            onClick={() => {
              clickEmojiHandler(i);
              setSelect({ ...select, emo: emoNum });
            }}
            key={i}
          >
            <EmotionIcons height="100%" width="100%" emotionTypes={`EMOTION_${i + 1}`} />
          </StEmoButton>
        ))}
      </SelectBar>
      <ImageContainer>
        {data.pages[0].map((item: Image, i: number) => (
          <ImageBox key={i}>
            <Image src={item.imgUrl} />
          </ImageBox>
        ))}
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 90vw;
  min-height: 1000px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid;
`;

const SelectBar = styled.div`
  display: flex;
  height: 6vw;
  margin-top: 0.5vw;
`;
const StEmoButton = styled.button`
  width: 4vw;
  border: 0;
  background-color: transparent;
  border-radius: 50%;
  margin: 1vw;
  cursor: pointer;
  &:hover {
    background-color: #d1d0d0;
  }
`;

const ImageContainer = styled.div`
  border: 1px solid;
  display: grid;
  z-index: 1;
  gap: 2vw;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const SelectTitle = styled.div`
  padding: 2vw;
  width: 5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Sort = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid;
  border-radius: 1vw;
  z-index: 5;
  position: relative;
`;

const SortListBtn = styled.button`
  border: 0;
  background-color: transparent;
  padding: 0.5vw;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const Image = styled.img`
  background-repeat: no-repeat;
  width: 100%;
  height: auto;
  border: 1px solid;
`;

const ImageBox = styled.div`
  width: 13vw;
  height: 13vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
export default Community;
