import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Flex from "../components/Flex";

const Members = () => {
  const nav = useNavigate();
  return (
    <Wrapper>
      <StMemberWrap>
        <Flex jc="center" ai="center">
          <h1>이모트랙을 만든 사람들</h1>
          <StMembers>
            <div>
              <div>FE 🧑🏻‍💻 윤지현 / 양인서 / 박승우</div>
              <div>BE 🧑🏻‍💻 이 진 / 홍다정 / 서영석 / 박문주</div>
              <div>UI & UX Designer 🎨 이수정</div>
            </div>
          </StMembers>
          <Flex gap={10}>
            <StGit>
              <a href="https://github.com/orgs/EmoTrak" target="_blank">
                Git repo
              </a>
            </StGit>
            <StNotion>
              <a
                href="https://www.notion.so/1nxeo/4-EmoTrak-0e155b9e771b4c659480f406933151f6"
                target="_blank"
              >
                팀 노션
              </a>
            </StNotion>
            <StBtn onClick={() => nav("/")}>
              <button>메인으로</button>
            </StBtn>
          </Flex>
        </Flex>
      </StMemberWrap>
    </Wrapper>
  );
};

export default Members;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;

  margin: 100px 0 50px 0;
`;
const StMemberWrap = styled.div`
  width: 50%;
  height: 90%;
  box-shadow: 5px 10px 10px 5px #eee;
  border-radius: 20px;
  padding-bottom: 50px;
`;
const StMembers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  margin-top: 40px;
  & > div {
    width: 400px;
    display: flex;
    gap: 15px;
    flex-direction: column;
  }
  & > div > div {
    display: flex;
    justify-items: flex-start;
    align-items: center;
    padding-left: 20px;
    background-color: #e5dfd3;
    height: 50px;
    font-weight: 500;
    border-radius: 15px;
  }
`;

const StNotion = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
  & > a {
    background-color: #e5dfd3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 50px;
    text-decoration: none;
    font-weight: 900;
    font-size: 25px;
    color: black;
    border: none;
    border-radius: 15px;
  }
`;

const StGit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  & > a {
    background-color: #e5dfd3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 50px;
    text-decoration: none;
    font-weight: 900;
    font-size: 25px;
    color: black;
    border: none;
    border-radius: 15px;
  }
`;
const StBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 220px;
    height: 50px;
    font-weight: 900;
    font-size: 25px;
    cursor: pointer;
    background-color: #e5dfd3;
    border: none;
    border-radius: 15px;
  }
`;
