import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import styled from "styled-components";
import { useState } from "react";
import { getCookie } from "../../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../../../data/routes/urls";
import useLikeComment from "../hooks/useLikeComment";

interface LikeType {
  isLike: boolean | undefined;
  id: number | undefined;
  count: number | undefined;
}

const LikeComment = ({ isLike: hasLike, id, count }: LikeType) => {
  const token = getCookie("token");
  const navigate = useNavigate();
  const [like, setLike] = useState<Partial<LikeType>>({
    isLike: hasLike,
    count: count,
  });

  const { likeMutate } = useLikeComment(setLike);

  return (
    <>
      {like.isLike ? (
        <LikeTrue
          onClick={() =>
            token
              ? likeMutate(id)
              : window.confirm("로그인 후 이용가능합니다") && navigate(LOGIN_PAGE)
          }
        >
          <RiHeart3Fill />
        </LikeTrue>
      ) : (
        <LikeFalse
          onClick={() =>
            token
              ? likeMutate(id)
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
export default LikeComment;
