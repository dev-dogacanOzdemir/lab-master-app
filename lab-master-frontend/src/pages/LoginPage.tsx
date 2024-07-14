import React from 'react';
import LoginForm from '../components/LoginForm';

interface LoginPageProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;

}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
    return (
        <div>
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
        </div>
    );
};

export default LoginPage;
