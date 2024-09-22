/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import React from "react";
import HomeRouter from "./Home";
import AuthRouter from "./Auth";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/state/slices/auth";

const IndexRouter = () => {
  const token = useSelector(selectAccessToken);

  return token ? <HomeRouter /> : <AuthRouter />;
};

export default IndexRouter;
