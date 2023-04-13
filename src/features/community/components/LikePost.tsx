import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import styled from "styled-components";
import { useState } from "react";
import { getCookie } from "../../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../../../data/routes/urls";

interface LikeType {
  isLike: boolean | undefined;
  id: number | undefined;
  count: number | undefined;
}

const LikePost = ({ isLike, id, count }: LikeType) => {
  const token = getCookie("token");
  const navigate = useNavigate();
  const [like, setLike] = useState<Partial<LikeType>>({
    isLike: isLike,
    count: count,
  });

  const { mutate: likeMutate, data: likedata } = useMutation({
    mutationFn: async () => {
      const data = await user.post(`/boards/likes/${id}`);
      return data.data;
    },
    onMutate: () => {
      if (like.isLike)
        return setLike({ ...like, isLike: false, count: Number(like.count) - 1 });
      else {
        return setLike({ ...like, isLike: true, count: Number(like.count) + 1 });
      }
    },
    onSuccess: (likedata) =>
      setLike({
        ...like,
        isLike: likedata?.data.hasLike,
        count: likedata?.data.likesCount,
      }),
  });

  return (
    <>
      {like.isLike ? (
        <LikeTrue
          onClick={() =>
            token
              ? likeMutate()
              : window.confirm("로그인 후 이용가능합니다") && navigate(LOGIN_PAGE)
          }
        >
          <RiHeart3Fill />
        </LikeTrue>
      ) : (
        <LikeFalse
          onClick={() =>
            token
              ? likeMutate()
              : window.confirm("로그인 후 이용가능합니다") && navigate(LOGIN_PAGE)
          }
        >
          <RiHeart3Line />
        </LikeFalse>
      )}
      <LikeCount>{like.count}명이 좋아합니다</LikeCount>
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
