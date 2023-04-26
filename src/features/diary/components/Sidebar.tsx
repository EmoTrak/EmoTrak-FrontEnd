import { DayProps } from "../../../data/type/type";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import { useNavigate } from "react-router-dom";
import { DETAIL_PAGE } from "../../../data/routes/urls";
import ClickModalPost from "./ClickModalPost";
import { MdArrowForwardIos } from "react-icons/md";
import * as St from "../styles/SidebarStyle";

const Sidebar = ({ side, setSide, data, diaryDay }: Partial<DayProps>) => {
  const navigate = useNavigate();

  const ClickCloseBtn = () => {
    if (setSide) {
      setSide((prev) => !prev);
    }
  };

  const detailData = data?.contents.filter((e) => e.day === diaryDay?.date);

  return (
    <>
      <St.Wrap side={side}>
        <St.CloseBtn onClick={ClickCloseBtn}>
          <MdArrowForwardIos />
        </St.CloseBtn>
        <St.Container>
          {detailData?.map((e, i) => (
            <St.ContentBox key={i}>
              <St.Imoticon>
                <EmotionIcons
                  height="100%"
                  width="100%"
                  emotionTypes={`EMOTION_${e.emoId}`}
                />
              </St.Imoticon>
              <St.Content
                key={i}
                onClick={() => navigate(`${DETAIL_PAGE}/${e.id}`)}
              >
                {e.detail}
              </St.Content>
            </St.ContentBox>
          ))}
          {Number(detailData?.length) < 2 && (
            <St.ContentBox>
              <St.Imoticon>
                <EmotionIcons
                  height="100%"
                  width="100%"
                  emotionTypes={"EMOTION_7"}
                />
              </St.Imoticon>
              <ClickModalPost diaryDay={diaryDay}>
                <St.PostContent>+</St.PostContent>
              </ClickModalPost>
            </St.ContentBox>
          )}
        </St.Container>
      </St.Wrap>
    </>
  );
};

export default Sidebar;
