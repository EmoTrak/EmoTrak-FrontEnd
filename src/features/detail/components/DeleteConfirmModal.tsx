import React from "react";
import * as UI from "../../../components/Modal";
import { IoMdClose } from "react-icons/io";
import { useDelete } from "../hooks/useDelete";
import { useNavigate } from "react-router-dom";
import { keys } from "../../../data/queryKeys/keys";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteModalProps } from "../../../data/type/type";
import * as St from "../styles/DeleteConfirmModalStyle";

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
    <UI.Modalroot>
      <UI.ModalBackground />
      <UI.ModalTrigger>{children}</UI.ModalTrigger>
      <UI.ModalContent>
        <St.PostContent>
          <St.CloseBtn>
            <UI.ModalClose>
              <IoMdClose />
            </UI.ModalClose>
          </St.CloseBtn>

          <St.Text>삭제하시겠어요?</St.Text>
          <St.ClickBtn>
            <UI.ModalClose>아니오</UI.ModalClose>
          </St.ClickBtn>
          <St.ClickBtn onClick={() => deletePostHandler(itemId)}>
            삭제하기
          </St.ClickBtn>
        </St.PostContent>
      </UI.ModalContent>
    </UI.Modalroot>
  );
};

export default DeleteConfirmModal;
