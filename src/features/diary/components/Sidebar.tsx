import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { DayProps } from "../../../data/type/type";
import { DETAIL_PAGE } from "../../../data/routes/urls";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import ClickModalPost from "./ClickModalPost";
import * as St from "../styles/SidebarStyle";
import { useEffect } from "react";
import { useWindowSize } from "../../../hooks/useWindowSize";

const Sidebar = ({ side, setSide, data, diaryDay }: Partial<DayProps>) => {
  const navigate = useNavigate();

  const ClickCloseBtn = () => {
    if (setSide) {
      setSide((pre) => !pre);
    }
  };

  const { resizeHandler, desktop } = useWindowSize();

  const detailData = data?.contents.filter((item) => item.day === diaryDay?.date);
  useEffect(() => {
    !desktop &&
      side &&
      document.body.scrollIntoView({ behavior: "smooth", block: "end" });
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <St.Wrap side={side}>
      <St.CloseBtn onClick={ClickCloseBtn}>
        <MdArrowForwardIos />
      </St.CloseBtn>
      <St.Container>
        {detailData?.map((item, i) => (
          <St.ContentBox key={i}>
            <St.Imoticon>
              <EmotionIcons
                height="100%"
                width="100%"
                emotionTypes={`EMOTION_${item.emoId}`}
              />
            </St.Imoticon>
            <St.Content key={i} onClick={() => navigate(`${DETAIL_PAGE}/${item.id}`)}>
              {item.detail}
            </St.Content>
          </St.ContentBox>
        ))}
        {Number(detailData?.length) < 2 && (
          <St.ContentBox>
            <St.Imoticon>
              <EmotionIcons height="100%" width="100%" emotionTypes={"EMOTION_7"} />
            </St.Imoticon>
            <ClickModalPost diaryDay={diaryDay}>
              <St.PostContent>+</St.PostContent>
            </ClickModalPost>
          </St.ContentBox>
        )}
      </St.Container>
    </St.Wrap>
  );
};

export default Sidebar;
