import { useNavigate } from "react-router-dom";
import Flex from "../../../components/Flex";
import { ADMIN_COMMENT, ADMIN_POST } from "../../../data/routes/urls";
import * as St from "../styles/AdminNavbarStyle";

const AdminNavbar = () => {
  const nav = useNavigate();
  return (
    <Flex>
      <St.AdminPostBtn onClick={() => nav(`${ADMIN_POST}`)}>
        post
      </St.AdminPostBtn>
      <St.AdminCommnetBtn onClick={() => nav(`${ADMIN_COMMENT}`)}>
        Comment
      </St.AdminCommnetBtn>
    </Flex>
  );
};

export default AdminNavbar;
