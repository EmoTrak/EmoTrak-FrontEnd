import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import user from "../../../lib/api/user";
import styled from "styled-components";
import { useState } from "react";
import { getCookie } from "../../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { themeColor } from "../../../utils/theme";
import { LikeType } from "../../../data/type/type";
import * as St from "../styles/LikePostStyle";

const LikePost = ({ isLike, id, count }: LikeType) => {
  const refreshToken = getCookie("refreshToken");
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
        return setLike({
          ...like,
          isLike: false,
          count: Number(like.count) - 1,
        });
      else {
        return setLike({
          ...like,
          isLike: true,
          count: Number(like.count) + 1,
        });
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
        <St.LikeTrue
          onClick={() =>
            refreshToken
              ? likeMutate()
              : window.confirm("로그인 후 이용가능합니다") && navigate("/")
          }
        >
          <RiHeart3Fill />
        </St.LikeTrue>
      ) : (
        <St.LikeFalse
          onClick={() =>
            refreshToken
              ? likeMutate()
              : window.confirm("로그인 후 이용가능합니다") && navigate("/")
          }
        >
          <RiHeart3Line />
        </St.LikeFalse>
      )}
      <St.LikeCount>{like.count}명이 좋아합니다</St.LikeCount>
    </>
  );
};

export default LikePost;
