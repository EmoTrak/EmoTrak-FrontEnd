import styled from "styled-components";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import Flex from "../components/Flex";
import { BsCaretDownFill } from "react-icons/bs";
import useEmoSelect from "../features/community/hooks/useEmoSelect";
import useInfinite from "../features/community/hooks/useInfinite";
import { useEffect, useState } from "react";
import { ImageType, SelectType } from "../data/type/d1";
import { useNavigate } from "react-router-dom";
import { COMMUNITY_PAGE } from "../data/routes/urls";

const Community = (): JSX.Element => {
  const navigate = useNavigate();
  const { clickEmojiHandler, emoNum } = useEmoSelect();
  const [postData, setPostData] = useState<ImageType[]>([]);
  const [select, setSelect] = useState<SelectType>({
    page: 1,
    emo: "1,2,3,4,5,6",
    size: 20,
    sort: "recent",
  });

  const [listOpen, setListOpen] = useState<boolean>(false);

  const clickSelectHandler = (sel: string): void => {
    setSelect({ ...select, sort: sel });
    setListOpen((pre: boolean): boolean => !pre);
  };

  const { boardData, isLast, boardLoading, boardError } = useInfinite(select);

  const onScroll = () => {
    if (isLast) {
      setSelect({ ...select, page: select.page });
    } else if (window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight) {
      setSelect({ ...select, page: select.page + 1 });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [select]);

  useEffect(() => {
    if (boardData) {
      setPostData((prevPostData: never[] | ImageType[]): never[] | ImageType[] => [
        ...prevPostData,
        ...boardData,
      ]);
    }
  }, [boardData]);

  if (boardLoading) {
    return <>로딩중</>;
  }

  if (boardError) {
    return <>에러</>;
  }

  return (
    <Container>
      <SelectBar>
        <Flex>
          <SelectTitle onClick={(): void => setListOpen((pre: boolean): boolean => !pre)}>
            {select.sort === "recent" ? "최신순" : "인기순"}
            <BsCaretDownFill />
          </SelectTitle>
          {listOpen && (
            <Sort>
              <SortListBtn onClick={(): void => clickSelectHandler("recent")}>
                최신순
              </SortListBtn>
              <SortListBtn onClick={(): void => clickSelectHandler("popular")}>
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
        {postData.map((item: ImageType, i: number) => (
          <ImageBox key={i} onClick={() => navigate(`${COMMUNITY_PAGE}/${item.id}`)}>
            <Image src={item.imgUrl} />
          </ImageBox>
        ))}
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 90vw;
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
  grid-template-columns: 1fr 1fr;
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
  font-family: "KyoboHand";
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
  cursor: pointer;
`;
export default Community;
