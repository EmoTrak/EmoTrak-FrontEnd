import { useNavigate } from "react-router-dom";
import Flex from "../../../components/Flex";
import { ADMIN_COMMENT, ADMIN_POST } from "../../../data/routes/urls";
import * as St from "../styles/AdminStyle";

const AdminNavbar = () => {
  const navigate = useNavigate();
  return (
    <Flex>
      <St.AdminBtn onClick={() => navigate(ADMIN_POST)}>post</St.AdminBtn>
      <St.AdminBtn onClick={() => navigate(ADMIN_COMMENT)}>Comment</St.AdminBtn>
    </Flex>
  );
};

export default AdminNavbar;
