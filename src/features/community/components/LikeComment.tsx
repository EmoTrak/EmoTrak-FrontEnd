import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import styled from "styled-components";
import { useState } from "react";
import { getCookie } from "../../../utils/cookies";
import { useNavigate } from "react-router-dom";
import useLikeComment from "../hooks/useLikeComment";
import { HOME_PAGE } from "../../../data/routes/urls";
import { themeColor } from "../../../utils/theme";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
    >
      {like.isLike ? (
        <LikeTrue
          onClick={() =>
            token
              ? likeMutate(id)
              : window.confirm("로그인 후 이용가능합니다") && navigate("/")
          }
        >
          <RiHeart3Fill />
        </LikeTrue>
      ) : (
        <LikeFalse
          onClick={() =>
            token
              ? likeMutate(id)
              : window.confirm("로그인 후 이용가능합니다") && navigate("/")
          }
        >
          <RiHeart3Line />
        </LikeFalse>
      )}
      <LikeCount>{like.count}</LikeCount>
    </div>
  );
};

const LikeTrue = styled.div`
  color: ${themeColor.main.red};
  font-size: 30px;
  display: flex;
  justify-content: center;

  cursor: pointer;
`;

const LikeFalse = styled.div`
  color: ${themeColor.main.gray};
  font-size: 30px;
  display: contents;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const LikeCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default LikeComment;
