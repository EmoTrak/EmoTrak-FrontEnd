import React, { useState } from "react";
import { ChildrenType, Idtype, UriType } from "../../../data/type/d1";
import * as UI from "../../../components/Modal";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";

const Report = ({ children, id, uri }: ChildrenType & Idtype & UriType) => {
  const [reason, setReason] = useState("");

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      await user.post(`/boards/${uri}/${id}`, { reason });
    },
  });
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
          <form onSubmit={submitFormHandler}>
            이유 : <input type="text" value={reason} onChange={changeInputHandler} />
            <button type="submit">신고</button>
          </form>
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
