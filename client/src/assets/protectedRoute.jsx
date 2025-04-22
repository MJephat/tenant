import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const { admin, isLoading, isError } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
      </div>
        );
    }
    
    if (!admin || isError) {
        return <Navigate to="/"  />;
    }

    return children;
}
export default ProtectedRoute;