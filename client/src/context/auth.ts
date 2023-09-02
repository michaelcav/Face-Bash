import React, { useContext } from "react";
import { AuthContext } from "./authContext";

export default function Auth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { currentUser } = authContext;

  return (
    {currentUser}
  );
}
