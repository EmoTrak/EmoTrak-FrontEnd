import React, { PropsWithChildren, useState } from "react";
import { Idtype, UriType } from "../../../data/type/type";
import * as UI from "../../../components/Modal";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import * as Sub from "../../../components/subModal";
import { keys } from "../../../data/queryKeys/keys";
import { themeColor } from "../../../utils/theme";
import Button from "../../../components/Button";

const Report = ({
  children,
  id,
  uri,
}: PropsWithChildren & Partial<UriType>) => {
  const [reason, setReason] = useState("");

  const changeInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value);
  };
  const queryClient = useQueryClient();
  const { mutate, status, reset } = useMutation({
    mutationFn: async (id: number | undefined) => {
      const data = await user.post(`/boards/${uri}/${id}`, { reason });
      return data;
    },
    onSuccess: () => {
      setReason("");
      queryClient.invalidateQueries([keys.GET_BOARD]);
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
            <ReportForm
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
              }}
            >
              <span>사유</span>
              <ReportInput value={reason} onChange={changeInputHandler} />
              <Sub.SubModalTrigger>
                <Button type="submit">신고</Button>
              </Sub.SubModalTrigger>
              <Sub.SubModalContent>
                <Container style={{ top: 0 }}>
                  {status === "idle" ? (
                    <>
                      <Text>정말 신고하시겠습니까?</Text>
                      <Button onClick={() => mutate(id)}>제출</Button>
                      <UI.ModalTrigger>
                        <Button>취소</Button>
                      </UI.ModalTrigger>
                    </>
                  ) : status === "success" ? (
                    <>
                      <Text>신고되었습니다</Text>
                      <UI.ModalTrigger>
                        <Button onClick={reset}>완료</Button>
                      </UI.ModalTrigger>
                    </>
                  ) : (
                    <>
                      <Text>신고 실패하였습니다</Text>
                      <UI.ModalTrigger>
                        <Button onClick={reset}>완료</Button>
                      </UI.ModalTrigger>
                    </>
                  )}
                </Container>
              </Sub.SubModalContent>
            </ReportForm>
          </Sub.SubModalroot>
        </Container>
      </UI.ModalContent>
    </UI.Modalroot>
  );
};

const Container = styled.div`
  width: 300px;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%);
  color: ${themeColor.main.chocomilk};
  background-color: ${themeColor.main.white};
  border-radius: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 5px ${themeColor.main.oatmeal};
  cursor: auto;
  height: 250px;
`;

const Text = styled.div`
  padding-bottom: 10px;
  color: ${themeColor.main.chocomilk};
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
`;

const ReportForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const ReportInput = styled.textarea`
  /* margin: 5px 0 5px 0; */
  padding: 10px;
  border-radius: 10px;
  resize: none;
  font-family: "KyoboHand";
  letter-spacing: 1.5px;
  font-size: 18px;
  border: 0;
  box-shadow: 0 0 10px ${themeColor.main.oatmeal};
  outline: none !important;
  width: 200px;
  height: 50px;
`;

export default Report;
