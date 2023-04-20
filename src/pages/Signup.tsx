import SignupForm from "../features/signup/components/SignupForm";
import { StLoginPageWrapper } from "./Login";

const Register = (): JSX.Element => {
  return (
    <StLoginPageWrapper>
      <SignupForm />
    </StLoginPageWrapper>
  );
};

export default Register;
