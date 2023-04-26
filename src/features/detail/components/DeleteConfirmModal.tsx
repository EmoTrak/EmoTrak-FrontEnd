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
import { useNavigate } from "react-router-dom";
import { device, themeColor } from "../../../utils/theme";
import { keys } from "../../../data/queryKeys/keys";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteModalProps } from "../../../data/type/type";

const DeleteConfirmModal = ({ children, itemId }: DeleteModalProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { deletePost } = useDelete();
  const deletePostHandler = (id: number) => {
    deletePost.mutate(id, {
      onSuccess: () => {
        navigate(-1);
        queryClient.resetQueries({ queryKey: [keys.GET_BOARD] });
      },
    });
  };

  return (
    <Modalroot>
      <ModalBackground />
      <ModalTrigger>{children}</ModalTrigger>
      <ModalContent>
        <PostContent>
          <CloseBtn>
            <ModalClose>
              <IoMdClose />
            </ModalClose>
          </CloseBtn>

          <Text>삭제하시겠어요?</Text>
          <ClickBtn>
            <ModalClose>아니오</ModalClose>
          </ClickBtn>
          <ClickBtn onClick={() => deletePostHandler(itemId)}>
            삭제하기
          </ClickBtn>
        </PostContent>
      </ModalContent>
    </Modalroot>
  );
};

const PostContent = styled.div`
  width: 380px;
  position: fixed;
  top: 10%;
  left: 50%;
  right: 50%;
  transform: translate(-50%, 50%);
  color: ${themeColor.main.chocomilk};
  background-color: ${themeColor.main.white};
  border-radius: 22px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  box-sizing: border-box;
  box-shadow: 1px 1px 10px 5px ${themeColor.main.oatmeal};
  padding: 60px 20px 40px;
  cursor: auto;
  ${device.mobile} {
    width: 280px;
    padding: 30px 20px 20px;
  }
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
  align-items: center;
  width: 200px;
  height: 70px;
  margin: 10px;
  cursor: pointer;
  ${device.mobile} {
    width: 180px;
    height: 65px;
    margin: 5px;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
`;
export default DeleteConfirmModal;
