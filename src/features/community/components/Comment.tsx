import React, { useState } from "react";
import { CommentProps } from "../../../data/type/d1";
import styled from "styled-components";
import useDeleteComment from "../hooks/useDeleteComment";
import useUpdateComment from "../hooks/useUpdateComment";
import LikeComment from "./LikeComment";
import Report from "./Report";

const Comment = ({ item }: Partial<CommentProps>) => {
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
          <LikeComment isLike={item?.hasLike} id={item?.id} count={item?.likesCnt} />
          <Report id={item?.id} uri="comments/report">
            <button>신고하기</button>
          </Report>
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
export default Comment;
