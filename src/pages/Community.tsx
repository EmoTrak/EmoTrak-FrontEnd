import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BsCaretDownFill } from "react-icons/bs";
import { ImageType } from "../data/type/type";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import useEmoSelect from "../features/community/hooks/useEmoSelect";
import useInfinite from "../features/community/hooks/useInfinite";
import * as St from "../features/community/styles/CommunityStyle";
import HoverImage from "../features/community/components/HoverImage";

const Community = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramSort = searchParams.get("sort");
  const paramEmo = searchParams.get("emo");
  const { clickEmojiHandler, emoNum, emoSelect } = useEmoSelect(paramEmo);

  const [listOpen, setListOpen] = useState<boolean>(false);
  const [postData, setPostData] = useState<ImageType[]>([]);
  const { data, fetchNextPage, hasNextPage } = useInfinite(paramSort, paramEmo);

  const clickSortListButton = (string: string) => {
    if (emoNum) {
      setSearchParams({ sort: string, emo: emoNum });
    } else {
      setSearchParams({ sort: string });
    }
  };

  let throttle: NodeJS.Timeout | null;
  // 스크롤 위치가 바닥에 닿았을때 다음 페이지 정보를 불러오는 함수
  const onScroll = () => {
    if (!throttle) {
      throttle = setTimeout(() => {
        const { scrollTop, offsetHeight } = document.documentElement;
        if (hasNextPage && window.innerHeight + scrollTop >= offsetHeight * 0.8) {
          fetchNextPage();
          saveScrollPosition();
        }
        saveScrollPosition();
        throttle = null;
      }, 300);
    }
  };

  // 스크롤 현재 위치를 저장
  const saveScrollPosition = () => {
    if (document.scrollingElement) {
      sessionStorage.setItem(
        "scrollPosition",
        document.documentElement.scrollTop.toString()
      );
    }
  };
  // 직전에 저장한 스크롤 위치가 있다면 그 위치로 이동
  const restoreScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, Number(scrollPosition));
      }, 70);
      sessionStorage.removeItem("scrollPosition");
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
    restoreScrollPosition();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (throttle) {
        clearTimeout(throttle);
      }
    };
  }, [hasNextPage]);

  useEffect(() => {
    if (emoNum && paramSort) {
      setSearchParams({ sort: paramSort, emo: emoNum });
    } else if (emoNum) {
      setSearchParams({ emo: emoNum });
    } else if (paramSort) {
      setSearchParams({ sort: paramSort });
    } else {
      setSearchParams({ ...searchParams });
    }
  }, [emoNum]);

  return (
    <St.Container>
      <St.SelectBar>
        <St.SelectTitle
          onClick={() => setListOpen((pre: boolean): boolean => !pre)}
          sort={paramSort}
        >
          {paramSort === "popular"
            ? "인기순"
            : paramSort === "mine"
            ? "내 게시글"
            : "최신순"}
          <BsCaretDownFill />
          {listOpen && (
            <St.Sort>
              <St.SortListBtn onClick={() => clickSortListButton("recent")}>
                최신순
              </St.SortListBtn>
              <St.SortListBtn onClick={() => clickSortListButton("popular")}>
                인기순
              </St.SortListBtn>
              <St.SortListBtn onClick={() => setSearchParams({ sort: "mine" })}>
                내 게시글
              </St.SortListBtn>
            </St.Sort>
          )}
        </St.SelectTitle>

        <St.ButtonBox>
          {paramSort !== "mine" &&
            new Array(6).fill(null).map((_, i) => (
              <St.StEmoButton
                key={i}
                onClick={() => clickEmojiHandler(i)}
                isClick={emoSelect[i]}
              >
                <EmotionIcons
                  height="100%"
                  width="100%"
                  emotionTypes={`EMOTION_${i + 1}`}
                />
              </St.StEmoButton>
            ))}
        </St.ButtonBox>
      </St.SelectBar>
      <St.ImageContainer>
        {postData.map((item: ImageType, i: number) => (
          <HoverImage item={item} key={i} />
        ))}
      </St.ImageContainer>
    </St.Container>
  );
};

export default Community;
