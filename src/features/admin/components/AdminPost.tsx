import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Flex from "../../../components/Flex";
import { BiArrowBack } from "react-icons/bi";
import { TbShareOff } from "react-icons/tb";
import { ADMIN, COMMUNITY_PAGE } from "../../../data/routes/urls";
import useAdminPost from "../hooks/useAdminPost";
import PageNation from "../../../components/PageNation";
import { IAdminData } from "../../../data/type/type";
import * as St from "../styles/AdminStyle";
import Error from "../../../components/Error";

const AdminPost = () => {
  const nav = useNavigate();
  const [page, setPage] = useState<number>(1);

  const { adminPostData, restrictShare, onReportDelete, status, isError } =
    useAdminPost(page);

  if (isError) {
    return <Error />;
  }
  return (
    <St.Wrapper>
      <St.BackBtn onClick={() => nav(`${ADMIN}`)}>
        <BiArrowBack />
      </St.BackBtn>
      <Flex>
        <St.H1>신고 게시물</St.H1>
        <div>
          <St.Table>
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

            <St.Tbody>
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
                          restrictShare(item.id);
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
            </St.Tbody>
          </St.Table>
        </div>
      </Flex>
      <Flex row jc="center">
        {status === "success" && (
          <PageNation
            page={page}
            setPage={setPage}
            totalCount={adminPostData?.totalCount}
            size={15}
          />
        )}
      </Flex>
    </St.Wrapper>
  );
};

export default AdminPost;
