import { useEffect } from "react";
import Boards from "../features/community/components/Boards";
import { useMeta } from "../hooks/useMeta";

const Community = () => {
  const { updateTitle, updateDescription, defaultMeta } = useMeta();
  useEffect(() => {
    const title = "EmoTrak : Community";
    const description = "나누고싶은 감정들을 공유하세요 !";
    updateTitle(title);
    updateDescription(description);
    return () => {
      defaultMeta();
    };
  }, []);

  return <Boards />;
};

export default Community;
