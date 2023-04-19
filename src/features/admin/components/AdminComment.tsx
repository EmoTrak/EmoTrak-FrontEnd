import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ADMIN } from "../../../data/routes/urls";
import { IAdminData } from "../../../data/type/d2";
import useAdminComment from "../hooks/useAdminComment";
import useAdminPost from "../hooks/useAdminPost";
import PageNation from "../../../components/PageNation";

const AdminComment = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const nav = useNavigate();
  const { adminCommentData, adminCommentDelete, status } =
    useAdminComment(page);
  const { onReportDelete } = useAdminPost(page);

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
            {adminCommentData?.contents?.map((item: IAdminData, i: number) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
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
      <PageWrap>
        {status === "success" && (
          <PageNation
            page={page}
            setPage={setPage}
            totalCount={adminCommentData?.totalCount}
            size={15}
          />
        )}
      </PageWrap>
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

const PageWrap = styled.div`
  display: flex;
  justify-content: center;
`;
