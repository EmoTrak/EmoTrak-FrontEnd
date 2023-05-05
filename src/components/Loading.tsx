import styled from "styled-components";
import { device, themeColor } from "../utils/theme";

const Loading = () => {
  return <Wrapper>Loading</Wrapper>;
};

export default Loading;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  border: 3px solid ${themeColor.main.coffemilk};
  border-radius: 50%;
  text-align: center;
  font-family: inherit;
  font-size: 30px;
  color: ${themeColor.main.chocomilk};
  letter-spacing: 4px;
  box-shadow: 3px 5px 5px ${themeColor.main.chocomilk};
  ${device.mobile} {
    width: 200px;
    height: 200px;
  }
  ${device.miniMobile} {
    width: 150px;
    height: 150px;
  }
  :before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-top: 3px solid ${themeColor.emoticon.yellow};
    border-right: 3px solid ${themeColor.emoticon.pink};
    border-bottom: 3px solid ${themeColor.emoticon.purple};
    border-left: 3px solid ${themeColor.emoticon.blue};
    border-radius: 50%;

    animation: animate 2s linear infinite;
    @keyframes animate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    ${device.mobile} {
      width: 100%;
      height: 100%;
    }
  }
`;
