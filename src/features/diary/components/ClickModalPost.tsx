import { PropsWithChildren } from "react";
import {
  ModalBackground,
  ModalClose,
  ModalContent,
  ModalTrigger,
  Modalroot,
} from "../../../components/Modal";
import { PropsType } from "../../../data/type/d1";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DRAW_POST_PAGE, IMAGE_POST_PAGE } from "../../../data/routes/urls";
import { IoMdClose } from "react-icons/io";
import { themeColor } from "../../../utils/theme";

const ClickModalPost = ({ children, diaryDay }: PropsType & PropsWithChildren) => {
  const navigate = useNavigate();

  return (
    <Modalroot>
      <ModalBackground />
      <ModalTrigger>{children}</ModalTrigger>
      <ModalContent top={30} left={40}>
        <PostContent>
          <ModalClose>
            <CloseBtn>
              <IoMdClose />
            </CloseBtn>
          </ModalClose>

          <Text>나의 감정을 기록해주세요!</Text>
          <ClickBtn
            onClick={() =>
              navigate(
                `${DRAW_POST_PAGE}/${diaryDay?.year}-${diaryDay?.month}-${diaryDay?.date}`
              )
            }
          >
            그림으로 기록할래요!
          </ClickBtn>
          <ClickBtn
            onClick={() =>
              navigate(
                `${IMAGE_POST_PAGE}/${diaryDay?.year}-${diaryDay?.month}-${diaryDay?.date}`
              )
            }
          >
            사진으로 기록할래요!
          </ClickBtn>
        </PostContent>
      </ModalContent>
    </Modalroot>
  );
};

const PostContent = styled.div`
  width: 380px;
  color: ${themeColor.main.chocomilk};
  background-color: ${themeColor.main.white};
  border-radius: 22px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 5px ${themeColor.main.gray};
  padding: 10% 2% 5%;
  cursor: auto;
`;
const Text = styled.div`
  padding-bottom: 10%;
  color: ${themeColor.main.chocomilk};
`;

const ClickBtn = styled.div`
  background-color: ${themeColor.main.gray};
  border-radius: 22px;
  display: flex;
  justify-content: center;
  padding: 10% 15%;
  margin: 2%;
  cursor: pointer;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
export default ClickModalPost;
