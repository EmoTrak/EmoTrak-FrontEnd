import React from 'react';
import {
  ModalClose,
  ModalContent,
  ModalTrigger,
  Modalroot,
} from '../../../components/Modal';
import { PropsType } from '../../../data/type/d1';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { DRAW_POST_PAGE, IMAGE_POST_PAGE } from '../../../data/routes/urls';

const ClickModalPost = ({ children, diaryDay }: PropsType) => {
  const navigate = useNavigate();

  return (
    <Modalroot>
      <ModalTrigger>{children}</ModalTrigger>
      <ModalContent>
        <PostContent>
          <ModalClose />
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
  color: #a18585;
  background-color: white;
  border-radius: 22px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 5px #e2e2e2;
  padding: 10% 2% 5%;
  cursor: auto;
`;
const Text = styled.div`
  padding-bottom: 10%;
  color: #6b5f5f;
`;

const ClickBtn = styled.div`
  background-color: #e5dfd3;
  border-radius: 22px;
  display: flex;
  justify-content: center;
  padding: 10% 15%;
  margin: 2%;
  cursor: pointer;
`;
export default ClickModalPost;
