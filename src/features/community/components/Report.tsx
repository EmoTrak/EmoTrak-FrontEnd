import React from "react";
import { ChildrenType } from "../../../data/type/d1";
import * as UI from "../../../components/Modal";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

const Report = ({ children }: ChildrenType) => {
  return (
    <UI.Modalroot>
      <UI.ModalBackground />
      <UI.ModalTrigger>{children}</UI.ModalTrigger>
      <UI.ModalContent>
        <Container>
          <CloseBtn>
            <UI.ModalClose>
              <IoMdClose />
            </UI.ModalClose>
          </CloseBtn>
          <Text>신고하기</Text>
          <label>
            이유 : <input type="text" />
          </label>
        </Container>
      </UI.ModalContent>
    </UI.Modalroot>
  );
};
const Container = styled.div`
  width: 300px;
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
  padding: 10% 2%;
  cursor: auto;
`;

const Text = styled.div`
  padding-bottom: 10%;
  color: #6b5f5f;
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
`;

export default Report;
