import React from "react";
import Flex from "../components/Flex";
import Canvas, { StCanvasWrapper } from "../features/post/components/Canvas";

const DrawingPost = (): JSX.Element => {
  return (
    <>
      <Flex row gap={10}>
        <Canvas width={800} height={700} />
        <StCanvasWrapper>여기가 글쓰기</StCanvasWrapper>
      </Flex>
    </>
  );
};

export default DrawingPost;
