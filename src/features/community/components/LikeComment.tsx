import { useNavigate } from "react-router-dom";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { LikeType } from "../../../data/type/type";
import { getCookie } from "../../../utils/cookies";
import useLikeComment from "../hooks/useLikeComment";
import * as St from "../styles/LikeCommentStyle";

const LikeComment = ({ isLike, id, count }: Partial<LikeType>) => {
  const refreshToken = getCookie("refreshToken");
  const navigate = useNavigate();

  const { likeMutate, like } = useLikeComment({ isLike, count });

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
