import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import user from "../../../lib/api/user";
import { keys } from "../../../data/queryKeys/keys";
import Flex from "../../../components/Flex";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { TbShareOff } from "react-icons/tb";

interface IAdminData {
  id: number;
  nickname: string;
  email: string;
  count: number;
  reson: string;
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

  const onDeleteHandler = () => {};

  return (
    <Wrapper>
      <BackBtn onClick={() => nav("/admin")}>
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
              {data?.map((item: any, i: number) => {
                return (
                  <tr key={i} style={{ margin: "10px" }}>
                    <td>{item.id}</td>
                    <td>{item.nickname}</td>
                    <td>{item.email}</td>
                    <td>{item.count}</td>
                    <td>{item.reason}</td>
                    <td>
                      <button onClick={onDeleteHandler}>
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
