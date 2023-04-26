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

const LikeComment = ({ isLike: hasLike, id, count }: Partial<LikeType>) => {
  const refreshToken = getCookie("refreshToken");
  const navigate = useNavigate();
  const [like, setLike] = useState<Partial<LikeType>>({
    isLike: hasLike,
    count: count,
  });

  const { likeMutate } = useLikeComment(setLike);

  return (
    <LikeContainer>
      {like.isLike ? (
        <LikeTrue
          onClick={() =>
            refreshToken
              ? likeMutate(id)
              : window.confirm("로그인 후 이용가능합니다") && navigate("/")
          }
        >
          <RiHeart3Fill />
        </LikeTrue>
      ) : (
        <LikeFalse
          onClick={() =>
            refreshToken
              ? likeMutate(id)
              : window.confirm("로그인 후 이용가능합니다") && navigate("/")
          }
        >
          <RiHeart3Line />
        </LikeFalse>
      )}
      <LikeCount>좋아요 {like.count}</LikeCount>
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
`;
const LikeTrue = styled.div`
  color: ${themeColor.main.red};
  font-size: 18px;
  display: flex;
  justify-content: center;

  cursor: pointer;
`;

const LikeFalse = styled.div`
  color: ${themeColor.main.gray};
  font-size: 17px;
  display: contents;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const LikeCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${themeColor.main.gray};
  font-size: 13px;
  margin-bottom: 5px;
`;
export default LikeComment;
