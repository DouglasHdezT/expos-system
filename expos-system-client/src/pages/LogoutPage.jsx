import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useEffect } from "react";


const LogoutPage = () => {
  const { logout } = useUserContext();

  useEffect(()=> {
    logout();
  }, [logout]);

  return (
    <Navigate to={"/"} />
  );
}

export default LogoutPage;