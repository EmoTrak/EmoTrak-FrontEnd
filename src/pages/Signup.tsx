import React from "react";
import SignupForm from "../features/signup/components/SignupForm";
import { StLoginPageWrapper } from "./Login";
import Flex from "../components/Flex";

const Register = (): JSX.Element => {
  return (
    <StLoginPageWrapper>
      <SignupForm />
    </StLoginPageWrapper>
  );
};

export default Register;
