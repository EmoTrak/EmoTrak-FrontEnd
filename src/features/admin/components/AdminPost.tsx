import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import user from "../../../lib/api/user";
import { keys } from "../../../data/queryKeys/keys";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { TbShareOff } from "react-icons/tb";
import { ADMIN } from "../../../data/routes/urls";

interface IAdminData {
  id: number;
  nickname: string;
  email: string;
  count: number;
  reason: string;
}

const AdminPost = (): JSX.Element => {
  const nav = useNavigate();
  const { data } = useQuery({
    queryKey: [keys.GET_ADMIN],
    queryFn: async () => {
      const { data } = await user.get("/admin/boards");
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
  console.log(data);
  
  // /boards/restrict/:boardId
  const { mutate } = useMutation({
    mutationFn: async (payload: number) => {
      console.log(payload);
      const { data } = await user.patch(`/boards/restrict/${payload}`);
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
                        <TbShareOff />
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