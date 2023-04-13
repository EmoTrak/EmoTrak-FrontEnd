import React, { useState } from "react";
import styled from "styled-components";
import BarChart from "../features/chart/components/BarChart";
import PieChart from "../features/chart/components/PieChart";
import { useQuery } from "@tanstack/react-query";
import { keys } from "../data/queryKeys/keys";
import user from "../lib/api/user";
import Flex from "../components/Flex";
import EmotionIcons from "../components/Icon/EmoticonIcons";

interface IOption {
  value: string;
  month: string;
}

const Chart = (): JSX.Element => {
  let date = new Date();
  const [year] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<string | number>(date.getMonth() + 1);

  const { data, isError, isLoading } = useQuery({
    queryKey: [keys.GET_CHART, { year }],
    queryFn: async () => {
      const { data } = await user.get("/graph/", {
        params: { year },
      });
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>로딩중..</div>;
  if (isError) return <div>에러..</div>;

  function handleOptionClick(optionValue: string) {
    setMonth(optionValue);
  }
  console.log(month);
  const options: IOption[] = [
    { value: "1", month: "Jan" },
    { value: "2", month: "Feb" },
    { value: "3", month: "Mar" },
    { value: "4", month: "April" },
    { value: "5", month: "May" },
    { value: "6", month: "Jun" },
    { value: "7", month: "Jul" },
    { value: "8", month: "Aug" },
    { value: "9", month: "Sep" },
    { value: "10", month: "Oct" },
    { value: "11", month: "Nov" },
    { value: "12", month: "Dec" },
  ];
  const emoIds: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <StWrapper>
      <Flex jc="center" ai="center">
        <StMonth>
          {options.map((item) => (
            <button
              style={{ margin: "10px" }}
              key={item.value}
              value={item.value}
              type="button"
              onClick={() => handleOptionClick(item.value)}
            >
              {item.month}
            </button>
          ))}
        </StMonth>
        <h1>{month}월 나의 감정은?</h1>
        <Flex row gap={50}>
          <PieChart graphData={data} month={month} />
          <BarChart graphData={data} month={month} />
          <StEmoList>
            {emoIds.map((item) => (
              <div key={item}>
                <EmotionIcons
                  height="50"
                  width="50"
                  emotionTypes={`EMOTION_${item}`}
                />
              </div>
            ))}
          </StEmoList>
        </Flex>
      </Flex>
    </StWrapper>
  );
};

export default Chart;

const StMonth = styled.form`
  display: flex;
  text-align: center;
  margin-top: 10px;
  border-radius: 5px;
  max-width: 100vw;

  button {
    background-color: #e5dfd3;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 10px;
    height: 50px;
    width: 200px;
    &:hover {
      background-color: #eee;
    }
  }
`;

const StWrapper = styled.div`
  margin-top: 50px;
  height: 80vh;
`;

const StEmoList = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;
