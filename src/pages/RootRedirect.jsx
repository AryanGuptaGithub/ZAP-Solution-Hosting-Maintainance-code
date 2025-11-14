import { Navigate } from "react-router-dom";
import useAuthUser from "@/hooks/useAuthUser";

export default function RootRedirect() {
  const { user } = useAuthUser();

  return user ? <Navigate to="/home" replace /> : <Navigate to="/dashboard" replace />;
}
