import { useState } from "react";
import { CommentType, Idtype } from "../../../data/type/type";
import Button from "../../../components/Button";
import useAddComment from "../hooks/useAddComment";
import * as St from "../styles/CreateCommentStyle";

const CreateComment = ({ id }: Idtype) => {
  const [input, setInput] = useState<CommentType>({
    comment: "",
  });

  const changeInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({ comment: e.target.value });
  };

  const { addComment } = useAddComment(id);

  const submitCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment(input);
    setInput({ comment: "" });
  };

  return (
    <St.CommentForm onSubmit={submitCommentHandler}>
      <span> 댓글</span>
      <St.CommentInput
        value={input.comment}
        onChange={changeInputHandler}
        placeholder="댓글을 남겨보세요!"
        spellCheck={false}
      />
      <Button size="small">댓글작성</Button>
    </St.CommentForm>
  );
};

export default CreateComment;
