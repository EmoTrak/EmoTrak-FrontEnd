import React, { useState } from "react";
import { CommentProps } from "../../../data/type/d1";
import styled from "styled-components";
import useDeleteComment from "../hooks/useDeleteComment";
import useUpdateComment from "../hooks/useUpdateComment";

const CommentEdit = ({ item }: Partial<CommentProps>) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<string | undefined>(item?.comment);

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditComment(e.target.value);
  };

  const { updateComment } = useUpdateComment(editComment);
  const { deleteComment } = useDeleteComment();

  return (
    <CommentBox>
      {edit ? (
        <input type="text" value={editComment} onChange={changeInputHandler} />
      ) : (
        <>
          <div>닉네임 : {item?.nickname}</div>
          <div>댓글 : {item?.comment}</div>
          <button>좋아요 : {item?.cmtLikesCnt}</button>
        </>
      )}
      {item?.hasAuth && (
        <>
          <button
            onClick={() =>
              edit
                ? updateComment(item.id, { onSuccess: () => setEdit((pre) => !pre) })
                : setEdit((pre) => !pre)
            }
          >
            {edit ? "수정완료" : "수정"}
          </button>
          <button onClick={() => deleteComment(item.id)}>삭제</button>
        </>
      )}
    </CommentBox>
  );
};

const CommentBox = styled.div`
  border-top: 1px solid;
`;
export default CommentEdit;
