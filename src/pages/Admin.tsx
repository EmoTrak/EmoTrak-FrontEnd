import { useNavigate } from "react-router-dom";
import Flex from "../components/Flex";
import Button from "../components/Button";
import { ADMIN_COMMENT, ADMIN_POST } from "../data/routes/urls";

const Admin = () => {
  const navigate = useNavigate();
  return (
    <Flex>
      <Button size="x-large" onClick={() => navigate(ADMIN_POST)}>
        post
      </Button>
      <Button size="x-large" onClick={() => navigate(ADMIN_COMMENT)}>
        Comment
      </Button>
    </Flex>
  );
};

export default Admin;
