import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COMMUNITY_PAGE } from "../../../data/routes/urls";
import { ImageType } from "../../../data/type/type";
import EmotionIcons from "../../../components/Icon/EmoticonIcons";
import * as St from "../styles/CommunityStyle";

const HoverImage = ({ item }: { item: ImageType }) => {
  const navigate = useNavigate();
  const [openEmo, setOpenEmo] = useState(false);

  const onMouseImage = () => {
    setOpenEmo((pre) => !pre);
  };

  return (
    <St.ImageBox
      onClick={() => navigate(`${COMMUNITY_PAGE}/${item.id}`)}
      onMouseOver={onMouseImage}
      onMouseOut={onMouseImage}
    >
      <St.Image src={item.imgUrl} />
      <St.HoverEmoticon openEmo={openEmo}>
        <EmotionIcons
          height="100%"
          width="100%"
          emotionTypes={`EMOTION_${item?.emoId}`}
        />
      </St.HoverEmoticon>
      <St.HoverNickName openEmo={openEmo}>{item.nickname}</St.HoverNickName>
    </St.ImageBox>
  );
};

export default HoverImage;
