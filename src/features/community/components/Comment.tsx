import React, { useState } from "react";
import { CommentProps } from "../../../data/type/type";
import useDeleteComment from "../hooks/useDeleteComment";
import useUpdateComment from "../hooks/useUpdateComment";
import LikeComment from "./LikeComment";
import Report from "./Report";
import PostDate from "./PostDate";
import { getCookie } from "../../../utils/cookies";
import { GiSiren } from "react-icons/gi";
import Button from "../../../components/Button";
import * as St from "../styles/CommentStyle";

const Comment = ({ item }: Partial<CommentProps>) => {
  const [edit, setEdit] = useState<boolean>(false);
  const refreshToken = getCookie("refreshToken");
  const [editComment, setEditComment] = useState<string | undefined>(
    item?.comment
  );

  const changeInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditComment(e.target.value);
  };

  const { updateComment } = useUpdateComment(editComment);
  const { deleteComment } = useDeleteComment();

  return (
    <St.CommentBox>
      {edit ? (
        <div
          style={{
            height: "122px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
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
            <Button
              size="x-small"
              onClick={() => edit && setEdit((pre) => !pre)}
            >
              취소
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <St.Nicname> {item?.nickname}</St.Nicname>
            <div style={{ margin: "5px 0" }}>{item?.comment}</div>
            <LikeComment
              isLike={item?.hasLike}
              id={item?.id}
              count={item?.likesCnt}
            />
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
            ) : (
              refreshToken && (
                <Report id={item?.id} uri="comments/report">
                  <St.ReportBtn>
                    <GiSiren />
                  </St.ReportBtn>
                </Report>
              )
            )}
            {typeof item?.createdAt === "string" && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "15px",
                }}
              >
                <PostDate date={item.createdAt} />
              </div>
            )}
          </div>
        </>
      )}
    </St.CommentBox>
  );
};

export default Comment;
