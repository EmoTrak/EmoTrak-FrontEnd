import React, { useState } from "react";
import { CommentProps } from "../../../data/type/type";
import styled from "styled-components";
import useDeleteComment from "../hooks/useDeleteComment";
import useUpdateComment from "../hooks/useUpdateComment";
import LikeComment from "./LikeComment";
import Report from "./Report";
import PostDate from "./PostDate";
import { getCookie } from "../../../utils/cookies";
import { GiSiren } from "react-icons/gi";
import Button from "../../../components/Button";
import { device, themeColor } from "../../../utils/theme";

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
            <Nicname> {item?.nickname}</Nicname>
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
                  <ReportBtn>
                    <GiSiren />
                  </ReportBtn>
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
    </CommentBox>
  );
};

export default Comment;

const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid white;
  width: 40vw;
  padding: 4px;
  ${device.mobile} {
    width: 80vw;
  }
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
    border-color: ${themeColor.main.oatmeal};
    box-shadow: 0 0 10px ${themeColor.main.oatmeal};
  }
`;

const Nicname = styled.div`
  color: ${themeColor.main.coffemilk};
  font-size: 15px;
`;

const ReportBtn = styled.button`
  font-size: 30px;
  border: 0;
  background-color: transparent;
  color: ${themeColor.main.red};
`;
