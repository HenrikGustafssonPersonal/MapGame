import { useContext } from "react";
import { AuthContext } from "./auth-context";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { currentUser } = useContext(AuthContext);
  let location = useLocation();

  if (!currentUser) {
    // Redirect the user to the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
