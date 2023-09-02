import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  console.log("aa", localStorage.getItem("accessToken"));

  if (!localStorage.getItem("accessToken")) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}
