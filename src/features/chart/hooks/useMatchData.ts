import { useState } from "react";
import { PropsData } from "../../../data/type/type";

export const useMatchData = ({ graphData, month }: PropsData) => {
  const [countArr, setCountArr] = useState<number[]>([]);
  const matchedData = graphData?.find((item) => item.month === Number(month));
  const newChartCount = countArr?.find((item) => item > 0);

  return { countArr, setCountArr, newChartCount, matchedData };
};
