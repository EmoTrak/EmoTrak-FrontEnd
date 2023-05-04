import styled from "styled-components";
import { themeColor } from "../utils/theme";

export default function Error() {
  return (
    <NoWrap>
      <div>
        <ErrorNum>5</ErrorNum>
        <Eye></Eye>
        <Eye></Eye>
      </div>
      <SubT>서버 점검중입니다.</SubT>
    </NoWrap>
  );
}

const ErrorNum = styled.span`
  font-size: 10em;
`;
const NoWrap = styled.div`
  width: 100vw;
  height: 100vh;
  color: ${themeColor.main.chocomilk};
  font-family: inherit;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Eye = styled.div`
  background: ${themeColor.main.chocomilk};
  border-radius: 50%;
  display: inline-block;
  height: 100px;
  position: relative;
  width: 100px;
  &::after {
    background: ${themeColor.main.oatmeal};
    border-radius: 50%;
    bottom: 56.1px;
    content: "";
    height: 33px;
    position: absolute;
    right: 33px;
    width: 33px;
  }
`;
const SubT = styled.div`
  font-size: 30px;
  margin-bottom: 4em;
`;
