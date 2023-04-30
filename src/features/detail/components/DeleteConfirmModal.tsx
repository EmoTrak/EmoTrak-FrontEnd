import { IoMdClose } from "react-icons/io";
import { DeleteModalProps } from "../../../data/type/type";
import * as UI from "../../../components/Modal";
import { useDelete } from "../hooks/useDelete";
import * as St from "../styles/DeleteConfirmModalStyle";

const DeleteConfirmModal = ({ children, itemId }: DeleteModalProps) => {
  const { deletePostHandler } = useDelete();

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

          <UI.ModalClose>
            <St.ClickBtn>아니오 </St.ClickBtn>
          </UI.ModalClose>

          <St.ClickBtn onClick={() => deletePostHandler(itemId)}>
            삭제하기
          </St.ClickBtn>
        </St.PostContent>
      </UI.ModalContent>
    </UI.Modalroot>
  );
};

export default DeleteConfirmModal;
