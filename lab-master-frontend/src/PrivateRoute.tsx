import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ComponentType;
    isAuthenticated: boolean;
    [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component, isAuthenticated, ...rest }) => {
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;