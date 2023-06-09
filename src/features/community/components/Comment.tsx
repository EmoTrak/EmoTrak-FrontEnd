import { useState } from "react";
import { RiAlarmWarningFill } from "react-icons/ri";
import { CommentProps } from "../../../data/type/type";
import { getCookie } from "../../../utils/cookies";
import { CommentInput } from "../styles/CreateCommentStyle";
import { ReportText, Text } from "../styles/ReportStyle";
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
        <St.EditBox>
          <CommentInput
            value={editComment}
            onChange={changeInputHandler}
            maxLength={250}
            spellCheck={false}
          />
          {editComment?.length === 250 && (
            <ReportText>댓글은 250자까지 입력가능합니다</ReportText>
          )}
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
              onClick={() => {
                edit && setEdit((pre) => !pre);
                setEditComment(item?.comment);
              }}
            >
              취소
            </Button>
          </div>
        </St.EditBox>
      ) : (
        <>
          <div>
            <St.Nicname> {item?.nickname}</St.Nicname>
            <St.Comment>{item?.comment}</St.Comment>
            <LikeComment
              isLike={item?.hasLike}
              id={item?.id}
              count={item?.likesCnt}
            />
          </div>

          <div>
            {item?.hasAuth ? (
              <St.EditAndDeleteBox>
                <Button size="x-small" onClick={() => setEdit((pre) => !pre)}>
                  수정
                </Button>
                <Button size="x-small" onClick={() => deleteComment(item?.id)}>
                  삭제
                </Button>
              </St.EditAndDeleteBox>
            ) : refreshToken && !item?.hasReport ? (
              <Report id={item?.id} uri="comments/report">
                <St.ReportBtn>
                  <RiAlarmWarningFill />
                </St.ReportBtn>
              </Report>
            ) : (
              refreshToken && <Text>신고완료</Text>
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
