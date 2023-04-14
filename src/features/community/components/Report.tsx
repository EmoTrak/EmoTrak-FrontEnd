import React, { useState } from "react";
import { ChildrenType, Idtype, UriType } from "../../../data/type/d1";
import * as UI from "../../../components/Modal";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import { AxiosError } from "axios";
import * as Sub from "../../../components/subModal";

const Report = ({ children, id, uri }: ChildrenType & Idtype & UriType) => {
  const [reason, setReason] = useState("");

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const { data, mutate, status, reset } = useMutation({
    mutationFn: async (id: number | undefined) => {
      const data = await user.post(`/boards/${uri}/${id}`, { reason });
      return data;
    },
    onSuccess: () => {
      setReason("");
    },
    onError: (error: AxiosError<Object>) => {
      error?.response?.status === 409 && alert("이미 신고된 게시물입니다");
      return error;
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
          <Sub.SubModalroot>
            <Text>신고하기</Text>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
              }}
            >
              이유 : <input type="text" value={reason} onChange={changeInputHandler} />
              <Sub.SubModalTrigger>
                <button type="submit">신고</button>
              </Sub.SubModalTrigger>
              <Sub.SubModalContent>
                <Container>
                  {status === "idle" ? (
                    <>
                      <Text>정말 신고하시겠습니까?</Text>
                      <button
                        onClick={() => {
                          mutate(id);
                        }}
                      >
                        제출
                      </button>
                      <UI.ModalTrigger>
                        <button>취소</button>
                      </UI.ModalTrigger>
                    </>
                  ) : status === "success" ? (
                    <>
                      <Text>신고되었습니다</Text>
                      <UI.ModalTrigger>
                        <button onClick={reset}>완료</button>
                      </UI.ModalTrigger>
                    </>
                  ) : (
                    <>
                      <Text>신고 실패하였습니다</Text>
                      <UI.ModalTrigger>
                        <button onClick={reset}>완료</button>
                      </UI.ModalTrigger>
                    </>
                  )}
                </Container>
              </Sub.SubModalContent>
            </form>
          </Sub.SubModalroot>
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
  height: 170px;
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
