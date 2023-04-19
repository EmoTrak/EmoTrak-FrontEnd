import { ReactElement } from "react";

export interface PropsData {
  month: number | string;
  graphData: graphDataType[];
}

export interface graphDataType {
  month: number;
  graph: Graph[];
}

export interface Graph {
  id: number;
  count: number;
  percentage: number;
}

export interface IAdminData {
  reportId: number;
  id: number;
  nickname: string;
  email: string;
  count: number;
  reason: string;
}

export interface IPayload {
  auth: string;
}
export interface IOption {
  value: string;
  month: string;
}
export type RouterProps = {
  token: string;
  isAuthenticated: boolean;
  pathname: string;
  isAdminAuthenticated?: string | boolean;
  children: ReactElement;
  isAuthAdmin: boolean;
};
