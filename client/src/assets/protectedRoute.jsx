import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const ProtectedRoute = ({ children }) => {
    const { admin, isLoading, isError } = useAuth();

    if (isLoading) return <div>Loading...</div>;
    
    if (!admin || isError) {
        return <Navigate to="/login"  />;
    }

    return children;
}
export default ProtectedRoute;