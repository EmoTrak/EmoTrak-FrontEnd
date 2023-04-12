import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import styled from "styled-components";
import { useState } from "react";
import { keys } from "../../../data/queryKeys/keys";

interface LikePost {
  hasLike: boolean | undefined;
  id: number | undefined;
  count: number | undefined;
  uri: string;
}

const LikePost = ({ hasLike, id, count, uri }: LikePost) => {
  const queryClient = useQueryClient();
  const [like, setLike] = useState<Partial<LikePost>>({
    hasLike: hasLike,
    count: count,
  });
  const { mutate: likeMutate, data: likedata } = useMutation({
    mutationFn: async (id: number | undefined) => {
      const data = await user.post(`/boards/${uri}/${id}`);
      return console.log(data);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries();
    // },
  });

  return (
    <>
      {like.hasLike ? (
        <>
          <LikeTrue
            onClick={() =>
              likeMutate(id, { onSuccess: () => setLike({ hasLike: false, count: 0 }) })
            }
          >
            <RiHeart3Fill />
          </LikeTrue>
          <LikeCount>{count}명이 좋아합니다</LikeCount>
        </>
      ) : (
        <>
          <LikeFalse
            onClick={() =>
              likeMutate(id, { onSuccess: () => setLike({ hasLike: true, count: 0 }) })
            }
          >
            <RiHeart3Line />
          </LikeFalse>
          <LikeCount>{count}명이 좋아합니다</LikeCount>
        </>
      )}
    </>
  );
};

const LikeTrue = styled.div`
  color: red;
  font-size: 30px;
  display: contents;
  cursor: pointer;
`;

const LikeFalse = styled.div`
  color: gray;
  font-size: 30px;
  display: contents;
  cursor: pointer;
`;

const LikeCount = styled.div`
  //
`;
export default LikePost;
