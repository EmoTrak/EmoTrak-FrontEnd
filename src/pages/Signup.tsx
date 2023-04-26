import styled from "styled-components";
import SignupForm from "../features/signup/components/SignupForm";
import { device } from "../utils/theme";

const Register = () => {
  return (
    <StSignupPageWrapper>
      <SignupForm />
    </StSignupPageWrapper>
  );
};

export default Register;

export const StSignupPageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  justify-content: center;
  ${device.tablet} {
    height: 120vh;
  }
  ${device.mobile} {
    height: 120vh;
  }
  ${device.miniMobile} {
    height: 120vh;
  }
`;
