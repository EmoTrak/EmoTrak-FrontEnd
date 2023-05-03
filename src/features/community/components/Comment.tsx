import React, { useState } from "react";
import { RiAlarmWarningFill } from "react-icons/ri";
import { CommentProps } from "../../../data/type/type";
import { getCookie } from "../../../utils/cookies";
import Button from "../../../components/Button";
import LikeComment from "./LikeComment";
import Report from "./Report";
import PostDate from "./PostDate";
import useDeleteComment from "../hooks/useDeleteComment";
import useUpdateComment from "../hooks/useUpdateComment";
import * as St from "../styles/CommentStyle";

const Comment = ({ item }: Partial<CommentProps>) => {
  const [edit, setEdit] = useState<boolean>(false);
  const refreshToken = getCookie("refreshToken");
  const [editComment, setEditComment] = useState<string | undefined>(item?.comment);

  const changeInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditComment(e.target.value);
  };

  const { updateComment } = useUpdateComment(editComment);
  const { deleteComment } = useDeleteComment();

  return (
    <St.CommentBox>
      {edit ? (
        <St.EditBox>
          <St.EditInput value={editComment} onChange={changeInputHandler} />
          <div>
            <Button
              size="x-small"
              onClick={() =>
                edit
                  ? updateComment(item?.id, {
                      onSuccess: () => setEdit((pre) => !pre),
                    })
                  : setEdit((pre) => !pre)
              }
            >
              수정완료
            </Button>
            <Button size="x-small" onClick={() => edit && setEdit((pre) => !pre)}>
              취소
            </Button>
          </div>
        </St.EditBox>
      ) : (
        <>
          <div>
            <St.Nicname> {item?.nickname}</St.Nicname>
            <St.Comment>{item?.comment}</St.Comment>
            <LikeComment isLike={item?.hasLike} id={item?.id} count={item?.likesCnt} />
          </div>

          <div>
            {item?.hasAuth ? (
              <div>
                <Button
                  size="x-small"
                  onClick={() =>
                    edit
                      ? updateComment(item?.id, {
                          onSuccess: () => setEdit((pre) => !pre),
                        })
                      : setEdit((pre) => !pre)
                  }
                >
                  {edit ? "수정완료" : "수정"}
                </Button>
                <Button size="x-small" onClick={() => deleteComment(item?.id)}>
                  삭제
                </Button>
              </div>
            ) : refreshToken && !item?.hasReport ? (
              <Report id={item?.id} uri="comments/report">
                <St.ReportBtn>
                  <RiAlarmWarningFill />
                </St.ReportBtn>
              </Report>
            ) : (
              refreshToken && <span>신고완료</span>
            )}
            {typeof item?.createdAt === "string" && (
              <St.DateBox>
                <PostDate date={item.createdAt} />
              </St.DateBox>
            )}
          </div>
        </>
      )}
    </St.CommentBox>
  );
};

export default Comment;
