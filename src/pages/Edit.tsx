import React from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
  const params = useParams();
  const dailyId = params.id;

  return <div>Edit</div>;
};

export default Edit;
