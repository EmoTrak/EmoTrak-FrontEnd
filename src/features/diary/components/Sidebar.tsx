import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import testImg from '../../../assets/emoticon/테스트용.png';
import { sidebarProps } from '../../../data/type/d1';

const Sidebar = ({ side }: Partial<sidebarProps>): JSX.Element => {
  return (
    <Container side={side}>
      <ContentBox>
        <Emoticon img={testImg} />
        <Content>여기에 내용이 들어갑니다</Content>
      </ContentBox>
    </Container>
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
  ${({ side }: Partial<sidebarProps>) =>
    side &&
    css`
      animation: ${BoxFade} 0.5s ease;
    `}
`;

const ContentBox = styled.div`
  height: 22vw;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
`;

const Emoticon = styled.div`
  width: 3vw;
  height: 3vw;
  background: ${({ img }: Partial<sidebarProps>) => `url(${img})`};
  background-size: contain;
`;

const Content = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 1.5vw;
  box-sizing: border-box;
  width: 80%;
  height: 90%;
  overflow: hidden;
  word-break: break-all;
`;
export default Sidebar;
