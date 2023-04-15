import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { TbShareOff } from "react-icons/tb";
import { ADMIN, COMMUNITY_PAGE } from "../../../data/routes/urls";
import { getCookie } from "../../../utils/cookies";
import { IAdminData, IPayload } from "../../../data/type/d2";
import useAdminPost from "../hooks/useAdminPost";

const AdminPost = (): JSX.Element => {
  const nav = useNavigate();
  const token = getCookie("token");
  let payloadJson;
  let payload!: IPayload;
  const [headerB64, payloadB64, signatureB64] = (token || "").split(".");
  if (typeof atob !== undefined && payloadB64) {
    payloadJson = atob(payloadB64);
  }
  if (payloadJson !== undefined) {
    payload = JSON.parse(payloadJson);
  }
  useEffect(() => {
    if (payload?.auth === undefined || payload?.auth !== "ADMIN") {
      alert("권한이 없습니다!");
      nav("/");
    }
  }, [payload, nav]);

  const { adminPostData, adminDeleteData, onReportDelete } = useAdminPost();

  return (
    <Wrapper>
      <BackBtn onClick={() => nav(`${ADMIN}`)}>
        <BiArrowBack />
      </BackBtn>
      <Flex>
        <H1>신고 게시물</H1>
        <div>
          <StTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>NickName</th>
                <th>E-Mail</th>
                <th>Count</th>
                <th>Reason</th>
                <th>Unshare</th>
              </tr>
            </thead>

            <StTbody>
              {adminPostData?.map((item: IAdminData, i: number) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.nickname}</td>
                    <td>{item.email}</td>
                    <td>{item.count}</td>
                    <td>{item.reason}</td>
                    <td>
                      <button
                        onClick={() => {
                          adminDeleteData(item.id);
                        }}
                      >
                        <TbShareOff />
                      </button>
                      <button
                        onClick={() => {
                          onReportDelete(item.reportId);
                        }}
                      >
                        신고삭제
                      </button>
                      <button
                        onClick={() => nav(`${COMMUNITY_PAGE}/${item.id}`)}
                      >
                        페이지이동
                      </button>
                    </td>
                  </tr>
                );
              })}
            </StTbody>
          </StTable>
        </div>
      </Flex>
    </Wrapper>
  );
};

export default AdminPost;

const Wrapper = styled.div`
  height: 100vh;
`;

const StTable = styled.table`
  width: 100%;
  height: 100px;
  justify-content: space-between;

  td {
    text-align: center;
  }
`;
const StTbody = styled.tbody`
  margin: 100px;
`;
const H1 = styled.h1`
  text-align: center;
`;
const BackBtn = styled.button`
  background-color: transparent;
  border: 1px solid #eee;
  margin: 30px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;
