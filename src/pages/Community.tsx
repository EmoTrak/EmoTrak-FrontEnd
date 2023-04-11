import styled from 'styled-components';
import EmotionIcons from '../components/Icon/EmoticonIcons';
import Flex from '../components/Flex';
import { useState } from 'react';
import { BsCaretDownFill } from 'react-icons/bs';

const Community = (): JSX.Element => {
  const [select, setSelect] = useState<string>('recent');
  const [listOpen, setListOpen] = useState<boolean>(false);
  const clickEmojiHandler = (num: number) => {
    //
  };

  const clickSelectHandler = (sel: string) => {
    setSelect(sel);
    setListOpen((pre) => !pre);
  };
  return (
    <Container>
      <SelectBar>
        <Flex>
          <SelectTitle onClick={() => setListOpen((pre) => !pre)}>
            {select === 'recent' ? '최신순' : '인기순'}
            <BsCaretDownFill />
          </SelectTitle>
          {listOpen && (
            <Sort>
              <SortListBtn onClick={() => clickSelectHandler('recent')}>
                최신순
              </SortListBtn>
              <SortListBtn onClick={() => clickSelectHandler('popular')}>
                인기순
              </SortListBtn>
            </Sort>
          )}
        </Flex>

        {new Array(6).fill(null).map((e, i) => (
          <StEmoButton onClick={(): void => clickEmojiHandler(i + 1)} key={i}>
            <EmotionIcons height="100%" width="100%" emotionTypes={`EMOTION_${i + 1}`} />
          </StEmoButton>
        ))}
      </SelectBar>
      <ImageContainer>z</ImageContainer>
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
  /* align-items: center; */
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

export default Community;
