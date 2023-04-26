import React, { PropsWithChildren, useState } from "react";
import { Idtype, UriType } from "../../../data/type/type";
import * as UI from "../../../components/Modal";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import * as Sub from "../../../components/subModal";
import { keys } from "../../../data/queryKeys/keys";
import Button from "../../../components/Button";
import * as St from "../styles/ReportStyle";

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
        <St.Container>
          <St.CloseBtn>
            <UI.ModalClose>
              <IoMdClose />
            </UI.ModalClose>
          </St.CloseBtn>
          <Sub.SubModalroot>
            <St.Text>신고하기</St.Text>
            <St.ReportForm
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
              }}
            >
              <span>사유</span>
              <St.ReportInput value={reason} onChange={changeInputHandler} />
              <Sub.SubModalTrigger>
                <Button type="submit">신고</Button>
              </Sub.SubModalTrigger>
              <Sub.SubModalContent>
                <St.Container style={{ top: 0 }}>
                  {status === "idle" ? (
                    <>
                      <St.Text>정말 신고하시겠습니까?</St.Text>
                      <Button onClick={() => mutate(id)}>제출</Button>
                      <UI.ModalTrigger>
                        <Button>취소</Button>
                      </UI.ModalTrigger>
                    </>
                  ) : status === "success" ? (
                    <>
                      <St.Text>신고되었습니다</St.Text>
                      <UI.ModalTrigger>
                        <Button onClick={reset}>완료</Button>
                      </UI.ModalTrigger>
                    </>
                  ) : (
                    <>
                      <St.Text>신고 실패하였습니다</St.Text>
                      <UI.ModalTrigger>
                        <Button onClick={reset}>완료</Button>
                      </UI.ModalTrigger>
                    </>
                  )}
                </St.Container>
              </Sub.SubModalContent>
            </St.ReportForm>
          </Sub.SubModalroot>
        </St.Container>
      </UI.ModalContent>
    </UI.Modalroot>
  );
};

export default Report;
