import { useState } from "react";
import { CommentType, Idtype } from "../../../data/type/d1";
import useAddComment from "../hooks/useAddComment";
import styled from "styled-components";
import Button from "../../../components/Button";

const CreateComment = ({ id }: Idtype) => {
  const [input, setInput] = useState<CommentType>({
    comment: "",
  });
  const changeInputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput({ ...input, comment: e.target.value });
  };

  const { addComment } = useAddComment(id);

  const submitCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment(input);
    setInput({ ...input, comment: "" });
  };

  return (
    <div style={{ margin: "10px 0 10px" }}>
      <form
        onSubmit={submitCommentHandler}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span>댓글</span>
        <CommentInput
          style={{ width: "500px", height: "70px", border: "1px solid #eee" }}
          value={input.comment}
          onChange={changeInputHandler}
          placeholder="댓글을 남겨보세요!"
        />
        <div>
          <Button size="small" type="submit">
            댓글작성
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;

const CommentInput = styled.textarea`
  margin: 5px 0 5px 0;
  padding: 10px;
  border-radius: 10px;
  resize: none;
  :focus {
    outline: none !important;
    border-color: #e7e1d9;
    box-shadow: 0 0 10px #e7e1d9;
  }
`;
