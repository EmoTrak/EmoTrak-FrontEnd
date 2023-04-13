import { useState } from "react";
import { CommentType, Idtype } from "../../../data/type/d1";
import useAddComment from "../hooks/useAddComment";

const CreateComment = ({ id }: Idtype) => {
  const [input, setInput] = useState<CommentType>({
    comment: "",
  });
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, comment: e.target.value });
  };

  const { addComment } = useAddComment(id);

  const submitCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment(input);
    setInput({ ...input, comment: "" });
  };

  return (
    <form onSubmit={submitCommentHandler}>
      댓글작성
      <input type="text" value={input.comment} onChange={changeInputHandler} />
      <button type="submit">댓글작성</button>
    </form>
  );
};

export default CreateComment;
