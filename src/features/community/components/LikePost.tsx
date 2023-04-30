import { useNavigate } from "react-router-dom";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { getCookie } from "../../../utils/cookies";
import { LikeType } from "../../../data/type/type";
import * as St from "../styles/LikePostStyle";
import { useLikePost } from "../hooks/useLikePost";
import Flex from "../../../components/Flex";

const LikePost = ({ isLike, id, count }: LikeType) => {
  const refreshToken = getCookie("refreshToken");
  const navigate = useNavigate();

  const { likeMutate, like } = useLikePost({ isLike, id, count });
  return (
    <Flex row ai="center">
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
      <St.LikeCount>{like.count}</St.LikeCount>
      <St.LikeText>명이 좋아합니다</St.LikeText>
    </Flex>
  );
};

export default LikePost;
