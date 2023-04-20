import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { TbShareOff } from "react-icons/tb";
import { ADMIN, COMMUNITY_PAGE } from "../../../data/routes/urls";
import { IAdminData } from "../../../data/type/d2";
import useAdminPost from "../hooks/useAdminPost";
import PageNation from "../../../components/PageNation";

const AdminPost = () => {
  const nav = useNavigate();
  const [page, setPage] = useState<number>(1);

  const { adminPostData, adminDeleteData, onReportDelete, status } =
    useAdminPost(page);

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
              {adminPostData?.contents?.map((item: IAdminData, i: number) => {
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
      <PageWrap>
        {status === "success" && (
          <PageNation
            page={page}
            setPage={setPage}
            totalCount={adminPostData?.totalCount}
            size={15}
          />
        )}
      </PageWrap>
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
const PageWrap = styled.div`
  display: flex;
  justify-content: center;
`;
