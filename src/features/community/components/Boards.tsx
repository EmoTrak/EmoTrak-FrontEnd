import styled from "styled-components";
import { BsCaretDownFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronsUp } from "react-icons/fi";
import { scrollOnTop } from "../../../utils/scollOnTop";
import { ImageType, SelectType } from "../../../data/type/d1";
import { COMMUNITY_PAGE } from "../../../data/routes/urls";
import useEmoSelect from "../hooks/useEmoSelect";
import useInfinite from "../hooks/useInfinite";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";

const Boards = (): JSX.Element => {
  const navigate = useNavigate();
  const { clickEmojiHandler, emoNum, emoSelect } = useEmoSelect();
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [postData, setPostData] = useState<ImageType[]>([]);
  const [select, setSelect] = useState<SelectType>({
    emo: "1,2,3,4,5,6",
    size: 20,
    sort: "recent",
  });

  const clickSelectHandler = (sel: string): void => {
    setSelect({ ...select, sort: sel });
    setListOpen((pre: boolean): boolean => !pre);
  };

  const { data, fetchNextPage, hasNextPage, boardError } = useInfinite(select);

  const onScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (hasNextPage && window.innerHeight + scrollTop + 1 >= offsetHeight) {
      fetchNextPage({ cancelRefetch: false });
      saveScrollPosition();
    }
    saveScrollPosition();
  };

  function saveScrollPosition() {
    if (document.scrollingElement) {
      sessionStorage.setItem(
        "scrollPosition",
        document.documentElement.scrollTop.toString()
      );
    }
  }

  function restoreScrollPosition() {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, Number(scrollPosition));
      }, 50);
      sessionStorage.removeItem("scrollPosition");
    }
  }

  useEffect(() => {
    if (data) {
      const newData = data.pages.reduce(
        (arr: never[] | ImageType[], cur) => [...arr, ...cur.data],
        []
      );
      setPostData(newData);
    }
  }, [data]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    restoreScrollPosition();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasNextPage]);

  useEffect(() => {
    if (emoNum) {
      setSelect({ ...select, emo: emoNum });
    }
  }, [emoNum]);

  if (boardError) {
    return <>에러</>;
  }

  return (
    <Container>
      <SelectBar>
        <SelectTitle onClick={(): void => setListOpen((pre: boolean): boolean => !pre)}>
          {select.sort === "recent" ? "최신순" : "인기순"}
          <BsCaretDownFill />
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
        </SelectTitle>

        <ButtonBox>
          {new Array(6).fill(null).map((e, i) => (
            <StEmoButton
              key={i}
              onClick={() => {
                clickEmojiHandler(i);
                setPostData([]);
              }}
              isClick={emoSelect[i]}
            >
              <EmotionIcons
                height="100%"
                width="100%"
                emotionTypes={`EMOTION_${i + 1}`}
              />
            </StEmoButton>
          ))}
        </ButtonBox>
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
  padding: 50px;
`;

const SelectBar = styled.div`
  height: 70px;
  background-color: #e5dfd3;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonBox = styled.div`
  margin-left: 30px;
`;
const StEmoButton = styled.button<{ isClick: boolean }>`
  width: 45px;
  height: 45px;
  border: 0;
  background-color: ${(props) => (props.isClick ? "#D0BD95" : "transparent")};
  margin-left: 15px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isClick ? "#D0BD95" : "#d1d0d0")};
  }
`;

const SelectTitle = styled.div`
  width: 60px;
  margin-left: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

const Sort = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid;
  border-radius: 10px;
  z-index: 5;
  position: absolute;
  top: 35px;
  width: 60px;
  left: -10px;
  overflow: hidden;
`;

const SortListBtn = styled.button`
  border: 0;
  background-color: transparent;
  padding: 5px;
  cursor: pointer;
  font-family: "KyoboHand";
  &:hover {
    background-color: lightgray;
  }
`;
const ImageContainer = styled.div`
  margin-top: 10px;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;
`;

const Image = styled.img`
  background-repeat: no-repeat;
  /* width: calc(100% / 4); */
  width: 100%;
  /* height: 100%; */
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  /* &:nth-child(1),
  &:nth-child(4),
  &:nth-child(9),
  &:nth-child(15n + 4) {
    grid-column: span 2;
    grid-row: span 2;
  }
  
  &:nth-child(20n + 1) {
    grid-column: span 2;
    grid-row: span 2;
  }
  &:nth-child(30n + 1) {
    grid-column: span 2;
    grid-row: span 2;
  } */
`;

const ScrollOntop = styled.button`
  position: fixed;
  bottom: 50px;
  right: 10%;
  background-color: white;
  border-radius: 50%;
  border: 0.5px solid;
  width: 30px;
  height: 30px;
  font-size: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export default Boards;
