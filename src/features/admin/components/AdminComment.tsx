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
import * as St from "../styles/AdminContentStyle";

const AdminComment = () => {
  const [page, setPage] = useState<number>(1);
  const nav = useNavigate();
  const { adminCommentData, adminCommentDelete, status } =
    useAdminComment(page);
  const { onReportDelete } = useAdminPost(page);

  return (
    <St.Wrapper>
      <St.BackBtn onClick={() => nav(`${ADMIN}`)}>
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
          </St.Tbody>
        </St.Table>
      </Flex>
      <St.PageWrap>
        {status === "success" && (
          <PageNation
            page={page}
            setPage={setPage}
            totalCount={adminCommentData?.totalCount}
            size={15}
          />
        )}
      </St.PageWrap>
    </St.Wrapper>
  );
};

export default AdminComment;
