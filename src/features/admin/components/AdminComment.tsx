import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ADMIN } from "../../../data/routes/urls";
import { getCookie } from "../../../utils/cookies";
import { IAdminData, IPayload } from "../../../data/type/d2";
import useAdminComment from "../hooks/useAdminComment";
import useAdminPost from "../hooks/useAdminPost";

const AdminComment = (): JSX.Element => {
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
  const { adminCommentData, adminCommentDelete } = useAdminComment();
  const { onReportDelete } = useAdminPost();

  return (
    <Wrapper>
      <BackBtn onClick={() => nav(`${ADMIN}`)}>
        <BiArrowBack />
      </BackBtn>
      <Flex>
        <H1>신고 댓글</H1>
        <StTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>NickName</th>
              <th>E-Mail</th>
              <th>Count</th>
              <th>Reason</th>
              <th>Delete</th>
            </tr>
          </thead>

          <StTbody>
            {adminCommentData?.map((item: IAdminData, i: number) => {
              return (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{item.nickname}</td>
                  <td>{item.email}</td>
                  <td>{item.count}</td>
                  <td>{item.reason}</td>
                  <td>
                    <button
                      onClick={() => {
                        adminCommentDelete(item.id);
                      }}
                    >
                      <RiDeleteBin6Line />
                    </button>
                    <button
                      onClick={() => {
                        onReportDelete(item.reportId);
                      }}
                    >
                      신고삭제
                    </button>
                  </td>
                </tr>
              );
            })}
          </StTbody>
        </StTable>
      </Flex>
    </Wrapper>
  );
};

export default AdminComment;

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
  &:hover {
    background-color: lightgray;
  }
`;
