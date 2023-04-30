import { useState } from "react";
import { Idtype } from "../../../data/type/type";
import { getCookie } from "../../../utils/cookies";
import Button from "../../../components/Button";
import useAddComment from "../hooks/useAddComment";
import * as St from "../styles/CreateCommentStyle";

const CreateComment = ({ id }: Idtype) => {
  const refreshToken = getCookie("refreshToken");
  const [comment, setComment] = useState<string>("");

  const changeInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const { addComment } = useAddComment(id);

  const submitCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.split(" ").join("").length || !comment.length) {
      return alert("내용을 입력해주세요");
    }
    addComment(comment);
    setComment("");
  };

  return (
    <St.CommentForm onSubmit={submitCommentHandler}>
      <span> 댓글</span>
      <St.CommentInput
        value={comment}
        onChange={changeInputHandler}
        placeholder={refreshToken ? "댓글을 남겨보세요!" : "로그인 후 이용 가능합니다!"}
        spellCheck={false}
        disabled={!refreshToken}
      />
      {refreshToken && <Button size="small">댓글작성</Button>}
    </St.CommentForm>
  );
};

export default CreateComment;
