import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import user from "../../../lib/api/user";
import { keys } from "../../../data/queryKeys/keys";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ADMIN } from "../../../data/routes/urls";
import { getCookie } from "../../../utils/cookies";

import { IAdminData, IPayload } from "../../../data/type/d2";

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
  }, []);
  const { data } = useQuery({
    queryKey: [keys.GET_ADMIN],
    queryFn: async () => {
      const { data } = await user.get("/admin/comments");
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: async (payload: number) => {
      console.log(payload);
      const { data } = await user.delete(`/boards/comments/${payload}`);
      return data;
    },
    onSuccess: () => {
      alert("삭제완료");
    },
  });

  return (
    <Wrapper>
      <BackBtn onClick={() => nav(`${ADMIN}`)}>
        <BiArrowBack />
      </BackBtn>
      <Flex>
        <H1>신고 댓글</H1>
        <div>
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
              {data?.map((item: IAdminData, i: number) => {
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
                          mutate(item.id);
                        }}
                      >
                        <RiDeleteBin6Line />
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
