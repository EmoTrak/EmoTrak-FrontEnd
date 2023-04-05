import React from 'react';
import styled, { css, keyframes } from 'styled-components';

type Props = {
  side: boolean;
};
const Sidebar = ({ side }: Props): JSX.Element => {
  return (
    <>
      <Container side={side}>
        <ContentBox>
          <Emoticon>😤</Emoticon>
          <Content>
            skldfjsldkfjasdfjshdflkskldfjsldkfjasdfjshdflksajhfdlskjhfsldkjhsalskdjhlskldfjsldkfjasdfjshdflksajhfdlskjhfsldkjhsalskdjhlskldfjsldkfjasdfjshdflksajhfdlskjhfsldkjhsalskdjhlskldfjsldkfjasdfjshdflksajhfdlskjhfsldkjhsalskdjhlsajhfdlskjhfsldkjhsalskdjhl
          </Content>
        </ContentBox>
        <ContentBox>
          <Emoticon>😀</Emoticon>
          <Content>z</Content>
        </ContentBox>
      </Container>
    </>
  );
};
const BoxFade = keyframes`
  from {
    right: -100%;
  }
  to {
    right: 0%;
  }
`;

const Container = styled.div`
  width: 25vw;
  background-color: beige;
  box-sizing: border-box;
  padding: 10vw 2vw;
  display: flex;
  flex-direction: column;
  gap: 6vw;
  position: relative;
  /* transition: all 1s ease-out; */
  ${({ side }: Props) =>
    side &&
    css`
      animation: ${BoxFade} 0.5s ease;
    `}/* right: 0%; */
`;

const ContentBox = styled.div`
  height: 22vw;
  box-sizing: border-box;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
`;

const Emoticon = styled.div`
  width: 3vw;
  height: 3vw;
  font-size: 3vw;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 1.5vw;
  box-sizing: border-box;
  width: 80%;
  height: 90%;
  overflow: hidden;
  /* white-space: nowrap; */
  /* text-overflow: ellipsis; */
  word-break: break-all;
  /* display: -webkit-box; */
  /* -webkit-box-orient: vertical; */
  /* -webkit-line-clamp: 8; */
`;
export default Sidebar;
