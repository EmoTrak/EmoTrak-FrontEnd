import styled from "styled-components";
import { BsCaretDownFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronsUp } from "react-icons/fi";
import { scrollOnTop } from "../../../utils/scollOnTop";
import { ImageType, SelectType } from "../../../data/type/d1";
import Flex from "../../../components/Flex";
import { COMMUNITY_PAGE } from "../../../data/routes/urls";
import useEmoSelect from "../hooks/useEmoSelect";
import useInfinite from "../hooks/useInfinite";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";

const Boards = (): JSX.Element => {
  const navigate = useNavigate();
  const { clickEmojiHandler, emoNum } = useEmoSelect();
  const [postData, setPostData] = useState<ImageType[]>([]);
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [select, setSelect] = useState<SelectType>({
    page: 1,
    emo: "1,2,3,4,5,6",
    size: 20,
    sort: "recent",
  });

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
  }, []);

  useEffect(() => {
    if (boardData) {
      setPostData((prevPostData: never[] | ImageType[]): never[] | ImageType[] => [
        ...prevPostData,
        ...boardData,
      ]);
    }
  }, [boardData]);

  useEffect(() => {
    setSelect({ ...select, emo: emoNum });
  }, [emoNum]);

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
            key={i}
            onClick={() => {
              clickEmojiHandler(i);
              setPostData([]);
            }}
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
      <ScrollOntop onClick={scrollOnTop}>
        <FiChevronsUp />
      </ScrollOntop>
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

const ScrollOntop = styled.button`
  position: fixed;
  bottom: 50px;
  right: 10%;
  background-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 0.5px solid;
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export default Boards;
