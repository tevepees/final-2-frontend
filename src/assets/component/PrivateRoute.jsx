import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({
  isAllowed,
  redirectTo = "/login",
  children,
}) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return <div>{children ? children : <Outlet />}</div>;
}
