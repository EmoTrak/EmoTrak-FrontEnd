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
  const { clickEmojiHandler, emoNum } = useEmoSelect();
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
    }
  };

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
  /* height: 1000px; */
  /* overflow: scroll; */
  border: 1px solid;
`;

const SelectBar = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonBox = styled.div`
  margin-left: 30px;
`;
const StEmoButton = styled.button`
  width: 45px;
  height: 45px;
  border: 0;
  background-color: transparent;
  margin-left: 15px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: #d1d0d0;
  }
`;

const ImageContainer = styled.div`
  border: 1px solid;
  display: grid;
  z-index: 1;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
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

const Image = styled.img`
  background-repeat: no-repeat;
  width: 100%;
  height: auto;
  border: 1px solid;
`;

const ImageBox = styled.div`
  width: 200px;
  height: 200px;
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
