import { useState } from "react";
import { CommentType, Idtype } from "../../../data/type/d1";
import useAddComment from "../hooks/useAddComment";
import styled from "styled-components";
import Button from "../../../components/Button";
import { device, themeColor } from "../../../utils/theme";

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
    <CommentForm onSubmit={submitCommentHandler}>
      <span> 댓글</span>
      <CommentInput
        value={input.comment}
        onChange={changeInputHandler}
        placeholder="댓글을 남겨보세요!"
        spellCheck={false}
      />
      <Button size="small" type="submit">
        댓글작성
      </Button>
    </CommentForm>
  );
};

export default CreateComment;

const CommentInput = styled.textarea`
  margin: 5px 0 5px 0;
  padding: 10px;
  border-radius: 10px;
  resize: none;
  font-family: "KyoboHand";
  letter-spacing: 1.5px;
  font-size: 18px;
  border: 0;
  box-shadow: 0 0 10px ${themeColor.main.oatmeal};
  outline: none !important;
  width: 40vw;
  height: 80px;
  ${device.mobile} {
    width: 80vw;
  }
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 20px;
`;
