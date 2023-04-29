import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Flex from "../../../components/Flex";
import { BiArrowBack } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ADMIN } from "../../../data/routes/urls";
import { IAdminData } from "../../../data/type/type";
import useAdminComment from "../hooks/useAdminComment";
import useAdminPost from "../hooks/useAdminPost";
import PageNation from "../../../components/PageNation";
import * as St from "../styles/AdminStyle";
import Error from "../../../components/Error";

const AdminComment = () => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const { adminCommentData, adminDeleteWrongReport, status, isError } =
    useAdminComment(page);
  const { onReportDelete } = useAdminPost(page);
  if (isError) {
    return <Error />;
  }

  return (
    <St.Wrapper>
      <St.BackBtn onClick={() => navigate(ADMIN)}>
        <BiArrowBack />
      </St.BackBtn>
      <Flex>
        <St.H1>신고 댓글</St.H1>
        <St.Table>
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

          <St.Tbody>
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
                        adminDeleteWrongReport(item.id);
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
          </St.Tbody>
        </St.Table>
      </Flex>
      <Flex row jc="center">
        {status === "success" && (
          <PageNation
            page={page}
            setPage={setPage}
            totalCount={adminCommentData?.totalCount}
            size={15}
          />
        )}
      </Flex>
    </St.Wrapper>
  );
};

export default AdminComment;
