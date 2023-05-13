import { PropsWithChildren } from "react";
import { IoMdClose } from "react-icons/io";
import { UriType } from "../../../data/type/type";
import { useReport } from "../hooks/useReport";
import Button from "../../../components/Button";
import * as UI from "../../../components/Modal";
import * as St from "../styles/ReportStyle";
import Flex from "../../../components/Flex";
import {
  SubModalContent,
  SubModalTrigger,
  SubModalroot,
} from "../../../components/SubModal";

const Report = ({ children, id, uri }: PropsWithChildren & Partial<UriType>) => {
  const { reason, changeInputHandler, mutate, status, reset } = useReport(uri);

  return (
    <UI.Modalroot>
      <UI.ModalBackground />
      <UI.ModalTrigger>
        <Flex ai="center">
          <St.ReportIcon>{children}</St.ReportIcon>
          <St.ReportText>신고하기</St.ReportText>
        </Flex>
      </UI.ModalTrigger>
      <UI.ModalContent>
        <St.Container>
          <St.CloseBtn>
            <UI.ModalClose>
              <IoMdClose />
            </UI.ModalClose>
          </St.CloseBtn>
          <SubModalroot>
            <St.Text>신고하기</St.Text>
            <St.ReportForm
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
              }}
            >
              <span>사유</span>
              <St.ReportInput
                value={reason}
                onChange={changeInputHandler}
                maxLength={255}
              />
              <SubModalTrigger>
                <Button type="submit">신고</Button>
              </SubModalTrigger>
              <SubModalContent>
                <St.Container style={{ top: 0 }}>
                  {status === "idle" ? (
                    <>
                      <St.Text>정말 신고하시겠습니까?</St.Text>
                      <Button onClick={() => mutate(id)}>제출</Button>
                      <UI.ModalTrigger>
                        <Button>취소</Button>
                      </UI.ModalTrigger>
                    </>
                  ) : (
                    status === "error" && (
                      <>
                        <St.Text>신고 실패하였습니다</St.Text>
                        <UI.ModalTrigger>
                          <Button onClick={reset}>완료</Button>
                        </UI.ModalTrigger>
                      </>
                    )
                  )}
                </St.Container>
              </SubModalContent>
            </St.ReportForm>
          </SubModalroot>
        </St.Container>
      </UI.ModalContent>
    </UI.Modalroot>
  );
};

export default Report;
