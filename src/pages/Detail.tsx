import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  DETAIL_PAGE,
  DRAW_EDIT_PAGE,
  HOME_PAGE,
  IMAGE_EDIT_PAGE,
} from "../data/routes/urls";
import { themeColor } from "../utils/theme";
import Flex from "../components/Flex";
import Button from "../components/Button";
import Star from "../components/Icon/Star";
import EmotionIcons from "../components/Icon/EmoticonIcons";
import { useGetDetail } from "../features/detail/hooks/useGetDetail";
import DeleteConfirmModal from "../features/detail/components/DeleteConfirmModal";
import * as St from "../features/detail/styles/DetailStyle";

const Detail = () => {
  const params = useParams();
  const dailyId: number = Number(params.id);
  const navigate = useNavigate();

  const { targetItem, otherItem, contents } = useGetDetail(dailyId);

  const navigateEditHandler = () => {
    if (targetItem?.draw === true) {
      navigate(`${DRAW_EDIT_PAGE}/${targetItem?.id}`);
    }
    if (targetItem?.draw === false) {
      navigate(`${IMAGE_EDIT_PAGE}/${targetItem?.id}`);
    }
  };

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
                        color={themeColor.palette.yellow}
                      />
                    ) : (
                      <Star
                        key={i}
                        size="30px"
                        color={themeColor.main.oatmeal}
                      />
                    )
                  )}
              </St.EmoStar>
            </St.EmoScore>
          </St.DetailEmoWrap>
          <St.SharedWrap>
            <Flex row>{targetItem?.share ? "Shared" : "Not Shared"}</Flex>
          </St.SharedWrap>
          <St.DetailText>
            <St.DetailWrapper>{targetItem?.detail}</St.DetailWrapper>
          </St.DetailText>
          <St.DetailBtnWrap>
            <Button size="x-large" onClick={navigateEditHandler}>
              수정
            </Button>
            <Button size="x-large" important>
              <DeleteConfirmModal itemId={targetItem?.id}>
                삭제
              </DeleteConfirmModal>
            </Button>
          </St.DetailBtnWrap>
        </Flex>
      </St.Wrapper>
    </St.Container>
  );
};

export default Detail;
