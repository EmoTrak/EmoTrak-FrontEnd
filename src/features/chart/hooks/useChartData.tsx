import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { keys } from "../../../data/queryKeys/keys";
import user from "../../../lib/api/user";

function useChartData(year: number) {
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

  return { chartData: data, isLoading, isError };
}

export default useChartData;
