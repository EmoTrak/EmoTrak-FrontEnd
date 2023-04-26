import { PropsWithChildren } from "react";
import * as UI from "../../../components/Modal";
import { PropsType } from "../../../data/type/type";
import { useNavigate } from "react-router-dom";
import { DRAW_POST_PAGE, IMAGE_POST_PAGE } from "../../../data/routes/urls";
import { IoMdClose } from "react-icons/io";
import * as St from "../styles/ClickModalPostStyle";

const ClickModalPost = ({
  children,
  diaryDay,
}: PropsType & PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <UI.Modalroot>
      <UI.ModalBackground />
      <UI.ModalTrigger>{children}</UI.ModalTrigger>
      <UI.ModalContent>
        <St.PostContent>
          <UI.ModalClose>
            <St.CloseBtn>
              <IoMdClose />
            </St.CloseBtn>
          </UI.ModalClose>

          <St.Text>나의 감정을 기록해주세요!</St.Text>
          <St.ClickBtn
            onClick={() =>
              navigate(
                `${DRAW_POST_PAGE}/${diaryDay?.year}-${diaryDay?.month}-${diaryDay?.date}`
              )
            }
          >
            그림으로 기록할래요!
          </St.ClickBtn>
          <St.ClickBtn
            onClick={() =>
              navigate(
                `${IMAGE_POST_PAGE}/${diaryDay?.year}-${diaryDay?.month}-${diaryDay?.date}`
              )
            }
          >
            사진으로 기록할래요!
          </St.ClickBtn>
        </St.PostContent>
      </UI.ModalContent>
    </UI.Modalroot>
  );
};

export default ClickModalPost;
