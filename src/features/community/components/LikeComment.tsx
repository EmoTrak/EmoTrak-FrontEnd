import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import styled from "styled-components";
import { useState } from "react";
import { getCookie } from "../../../utils/cookies";
import { useNavigate } from "react-router-dom";
import useLikeComment from "../hooks/useLikeComment";
import { HOME_PAGE } from "../../../data/routes/urls";
import { themeColor } from "../../../utils/theme";
import Flex from "../../../components/Flex";
import { LikeType } from "../../../data/type/type";
import * as St from "../styles/LikeCommentStyle";

const LikeComment = ({ isLike: hasLike, id, count }: Partial<LikeType>) => {
  const refreshToken = getCookie("refreshToken");
  const navigate = useNavigate();
  const [like, setLike] = useState<Partial<LikeType>>({
    isLike: hasLike,
    count: count,
  });

  const { likeMutate } = useLikeComment(setLike);

  return (
    <St.LikeContainer>
      {like.isLike ? (
        <St.LikeTrue
          onClick={() =>
            refreshToken
              ? likeMutate(id)
              : window.confirm("로그인 후 이용가능합니다") && navigate("/")
          }
        >
          <RiHeart3Fill />
        </St.LikeTrue>
      ) : (
        <St.LikeFalse
          onClick={() =>
            refreshToken
              ? likeMutate(id)
              : window.confirm("로그인 후 이용가능합니다") && navigate("/")
          }
        >
          <RiHeart3Line />
        </St.LikeFalse>
      )}
      <St.LikeCount>좋아요 {like.count}</St.LikeCount>
    </St.LikeContainer>
  );
};

export default LikeComment;
