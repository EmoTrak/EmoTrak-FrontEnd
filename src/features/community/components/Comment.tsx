import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import user from '../../../lib/api/user';
import { CommentType, CommentProps } from '../../../data/type/d1';
import { keys } from '../../../data/queryKeys/keys';
import CommentEdit from './CommentEdit';
import useAddComment from '../hooks/useAddComment';

const Comment = ({ id, commentData }: Partial<CommentProps>) => {
  const [input, setInput] = useState<CommentType>({
    comment: '',
  });
  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, comment: e.target.value });
  };

  const { addComment } = useAddComment(id);

  const submitCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment(input);
    setInput({ ...input, comment: '' });
  };

  return (
    <CommentContainer>
      <form onSubmit={submitCommentHandler}>
        댓글작성
        <input type="text" value={input.comment} onChange={changeInputHandler} />
        <button type="submit">댓글작성</button>
      </form>
      {commentData?.map((item, i) => (
        <CommentEdit item={item} key={i} />
      ))}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 100%;
`;

export default Comment;
