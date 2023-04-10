import React, { useState } from "react";
import styled from "styled-components";
import BarChart from "../features/chart/components/BarChart";
import PieChart from "../features/chart/components/PieChart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { keys } from "../data/queryKeys/keys";
import user from "../lib/api/user";
import Flex from "../components/Flex";

const Chart = (): JSX.Element => {
  const queryClient = useQueryClient();
  let date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const { data, isError, isLoading } = useQuery({
    queryKey: [keys.GET_CHART, { year }],
    queryFn: async () => {
      const { data } = await user.get("/graph/", {
        params: { year },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [keys.GET_CHART] });
    },
    refetchOnWindowFocus: false,
    refetchInterval: 5000,
  });
  console.log(data);
  if (isLoading) return <div>로딩중..</div>;
  if (isError) return <div>에러..</div>;
  return (
    <StWrapper>
      <Flex jc="center" ai="center">
        <StMonth>
          <option value="1">Jan</option>
          <option value="2">Feb</option>
          <option value="3">Mar</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">Jun</option>
          <option value="7">Jul</option>
          <option value="8">Aug</option>
          <option value="9">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </StMonth>
        {/* <CheckBoxWrapper>
        <CheckBox onClick={toggleChart} type="checkbox" />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper> */}
        <Flex row>
          <PieChart data={data} />
          <BarChart data={data} />
        </Flex>
      </Flex>
    </StWrapper>
  );
};

export default Chart;

const StMonth = styled.select`
  display: flex;
  text-align: center;
  width: 200px;
  height: 30px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid #9b9b9b;
`;

const StWrapper = styled.div`
  height: 100vh;
`;
