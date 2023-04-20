import React from "react";
import {
  ModalBackground,
  ModalClose,
  ModalContent,
  ModalTrigger,
  Modalroot,
} from "../../../components/Modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useDelete } from "../hooks/useDelete";
import Flex from "../../../components/Flex";

interface DeleteModalProps {
  children: React.ReactNode;
  itemId: number;
}

const DeleteConfirmModal = ({ children, itemId }: DeleteModalProps) => {
  const navigate = useNavigate();
  const { deletePost } = useDelete();
  const deletePostHandler = (id: number) => {
    deletePost.mutate(id);
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

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
`;
export default DeleteConfirmModal;
