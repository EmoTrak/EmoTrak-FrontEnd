import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  DETAIL_PAGE,
  DRAW_EDIT_PAGE,
  HOME_PAGE,
  IMAGE_EDIT_PAGE,
  COMMUNITY_DETAIL,
} from "../data/routes/urls";
import { themeColor } from "../utils/theme";
import { useGetDetail } from "../features/detail/hooks/useGetDetail";
import Flex from "../components/Flex";
import Button from "../components/Button";
import Star from "../components/Icon/Star";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import DeleteConfirmModal from "../features/detail/components/DeleteConfirmModal";
import * as St from "../features/detail/styles/DetailStyle";
import { useSave } from "../features/detail/hooks/useSave";

const Detail = () => {
  const params = useParams();
  const dailyId: number = Number(params.id);
  const navigate = useNavigate();

  const { targetItem, otherItem, contents } = useGetDetail(dailyId);

  const navigateEditHandler = () => {
    if (targetItem?.draw) {
      navigate(`${DRAW_EDIT_PAGE}/${targetItem?.id}`);
    }
    if (!targetItem?.draw) {
      navigate(`${IMAGE_EDIT_PAGE}/${targetItem?.id}`);
    }
  };

  const { openDownload, downloadPicture, setOpenDownload } = useSave(
    targetItem,
    dailyId
  );
  return (
    <St.Container>
      <St.BackWrap>
        <Button icon size="x-small" onClick={() => navigate(HOME_PAGE)}>
          <AiOutlineLeft fontSize="40px" />
        </Button>
      </St.BackWrap>
      <St.CanvasWrap>
        <St.DetailImageBox>
          {targetItem?.imgUrl ? (
            <St.DetailImage src={targetItem?.imgUrl} alt="" />
          ) : (
            <St.DefaultImage>이미지가 필요합니다</St.DefaultImage>
          )}
          {targetItem?.draw && (
            <Button
              style={{ position: "absolute", bottom: "0" }}
              size="small"
              onClick={() => setOpenDownload(true)}
            >
              그림저장
            </Button>
          )}
          {openDownload && downloadPicture()}
        </St.DetailImageBox>
      </St.CanvasWrap>
      <St.Wrapper>
        <Flex>
          <St.EmoMoveBtn>
            {contents?.length < 2 || dailyId <= otherItem?.id ? (
              <Button icon disabled style={{ fontSize: "30px" }}>
                <AiOutlineLeft />
              </Button>
            ) : (
              <Button
                icon
                onClick={() => navigate(`${DETAIL_PAGE}/${otherItem.id}`)}
                style={{ fontSize: "30px", color: `${themeColor.main.gray}` }}
              >
                <AiOutlineLeft />
              </Button>
            )}
            {contents?.length < 2 || dailyId >= otherItem?.id ? (
              <Button icon disabled style={{ fontSize: "30px" }}>
                <AiOutlineRight />
              </Button>
            ) : (
              <Button
                icon
                onClick={() => navigate(`${DETAIL_PAGE}/${otherItem.id}`)}
                style={{ fontSize: "30px", color: `${themeColor.main.gray}` }}
              >
                <AiOutlineRight />
              </Button>
            )}
          </St.EmoMoveBtn>
          <St.DetailEmoWrap>
            <St.EmoIconWrap>
              <EmotionIcons
                height="50"
                width="50"
                emotionTypes={`EMOTION_${targetItem?.emoId}`}
              />
            </St.EmoIconWrap>
            <St.EmoScore>
              <h3>내 감정점수</h3>
              <St.EmoStar>
                {Array(5)
                  .fill(null)
                  .map((_, i) =>
                    i < targetItem?.star ? (
                      <Star
                        key={i}
                        size="30px"
                        disabled
                        color={themeColor.palette.yellow}
                      />
                    ) : (
                      <Star
                        key={i}
                        size="30px"
                        disabled
                        color={themeColor.main.oatmeal}
                      />
                    )
                  )}
              </St.EmoStar>
            </St.EmoScore>
          </St.DetailEmoWrap>
          <St.SharedWrap>
            <Flex row>
              {targetItem?.share ? (
                <St.SharedText
                  onClick={() =>
                    navigate(`${COMMUNITY_DETAIL}/${targetItem.id}`)
                  }
                >
                  {">>"}댓글보러 갈래요{"<<"}
                </St.SharedText>
              ) : (
                "Not Shared"
              )}
            </Flex>
          </St.SharedWrap>
          <St.DetailText>
            <St.DetailWrapper>{targetItem?.detail}</St.DetailWrapper>
          </St.DetailText>
          <St.DetailBtnWrap>
            <Button size="x-large" onClick={navigateEditHandler}>
              수정
            </Button>

            <DeleteConfirmModal itemId={targetItem?.id}>
              <Button size="x-large" important>
                삭제
              </Button>
            </DeleteConfirmModal>
          </St.DetailBtnWrap>
        </Flex>
      </St.Wrapper>
    </St.Container>
  );
};

export default Detail;
