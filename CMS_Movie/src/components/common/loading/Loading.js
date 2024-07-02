import React, { memo } from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return <HashLoader color="#ff4000" />;
};

export default memo(Loading);
