import React, { useState } from "react";
import { CommentProps } from "../../../data/type/d1";
import styled from "styled-components";
import useDeleteComment from "../hooks/useDeleteComment";
import useUpdateComment from "../hooks/useUpdateComment";
import LikeComment from "./LikeComment";
import Report from "./Report";
import PostDate from "./PostDate";
import { getCookie } from "../../../utils/cookies";
import { GiSiren } from "react-icons/gi";
import Button from "../../../components/Button";
import Flex from "../../../components/Flex";

const Comment = ({ item }: Partial<CommentProps>) => {
  const [edit, setEdit] = useState<boolean>(false);
  const token = getCookie("token");
  const [editComment, setEditComment] = useState<string | undefined>(item?.comment);

  const changeInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditComment(e.target.value);
  };

  const { updateComment } = useUpdateComment(editComment);
  const { deleteComment } = useDeleteComment();

  return (
    <CommentBox>
      {edit ? (
        <div
          style={{
            height: "122px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <EditInput value={editComment} onChange={changeInputHandler} />
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
        </div>
      ) : (
        <>
          <div>
            <h4 style={{ margin: "5px 0" }}>닉네임 : {item?.nickname}</h4>
            <div style={{ margin: "5px 0" }}>댓글 : {item?.comment}</div>
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
              <div>
                <LikeComment
                  isLike={item?.hasLike}
                  id={item?.id}
                  count={item?.likesCnt}
                />
                <div>
                  {token && (
                    <Report id={item?.id} uri="comments/report">
                      <Button
                        icon
                        style={{
                          color: "red",
                          fontSize: "30px",
                        }}
                      >
                        <GiSiren />
                      </Button>
                    </Report>
                  )}
                </div>
              </div>
            )}
            {typeof item?.createdAt === "string" && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PostDate date={item.createdAt} />
              </div>
            )}
          </div>
        </>
      )}
    </CommentBox>
  );
};

export default Comment;

const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ae9898;
  width: 40vw;
  padding: 4px;
`;
const EditInput = styled.textarea`
  width: 40vw;
  height: 50px;
  margin: 5px 0;
  padding: 10px;
  border: none;
  border-radius: 10px;
  resize: none;
  :focus {
    outline: none;
    border-color: #e7e1d9;
    box-shadow: 0 0 10px #e7e1d9;
  }
`;
