import React from "react";
import {
  ModalBackground,
  ModalClose,
  ModalContent,
  ModalTrigger,
  Modalroot,
} from "../../../components/Modal";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useDelete } from "../hooks/useDelete";
import Flex from "../../../components/Flex";
import { useNavigate } from "react-router-dom";
import { themeColor } from "../../../utils/theme";

interface DeleteModalProps {
  children: React.ReactNode;
  itemId: number;
}

const DeleteConfirmModal = ({ children, itemId }: DeleteModalProps) => {
  const navigate = useNavigate();
  const { deletePost } = useDelete();
  const deletePostHandler = (id: number) => {
    deletePost.mutate(id, {
      onSuccess: () => {
        navigate(-1);
      },
    });
  };

  return (
    <Modalroot>
      <ModalBackground />
      <ModalTrigger>{children}</ModalTrigger>
      <ModalContent top={10} left={30}>
        <PostContent>
          <CloseBtn>
            <ModalClose>
              <IoMdClose />
            </ModalClose>
          </CloseBtn>

          <Text>삭제하시겠어요?</Text>
          <Flex row>
            <ClickBtn>
              <ModalClose>아니오</ModalClose>
            </ClickBtn>
            <ClickBtn onClick={() => deletePostHandler(itemId)}>삭제하기</ClickBtn>
          </Flex>
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
  background-color: ${themeColor.main.oatmeal};
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
  right: 5px;
`;
export default DeleteConfirmModal;
