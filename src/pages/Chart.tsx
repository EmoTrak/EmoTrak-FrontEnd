import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import BarChart from "../features/chart/components/BarChart";
import PieChart from "../features/chart/components/PieChart";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../data/queryKeys/keys";
import user from "../lib/api/user";
import Flex from "../components/Flex";

const Chart = (): JSX.Element => {
  let date = new Date();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [content, setContent] = useState<number | string>(0);

  const { data, isError, isLoading } = useQuery({
    queryKey: [keys.GET_CHART, { year }],
    queryFn: async () => {
      const { data } = await user.get("/graph/", {
        params: { year },
      });
      return data;
    },
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <div>로딩중..</div>;
  if (isError) return <div>에러..</div>;
  console.log(data);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target as HTMLSelectElement;
    setContent(value);
  };
  return (
    <StWrapper>
      <Flex jc="center" ai="center">
        <StMonth defaultValue={content} onChange={onChangeHandler}>
          <option>Select</option>
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
        <Flex row>
          <PieChart data={data} content={content} />
          <BarChart data={data} content={content} />
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
  margin-top: 50px;
  height: 80vh;
`;
