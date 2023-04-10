import React from "react";
import { useNavigate } from "react-router-dom";

const AdminUser = (): JSX.Element => {
  const nav = useNavigate();

  return (
    <div>
      <button onClick={() => nav("/admin")}>admin홈으로</button>
    </div>
  );
};

export default AdminUser;
