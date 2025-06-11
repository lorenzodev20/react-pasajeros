import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/Login';


const RedirectToHomeIfAuthenticated = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? null : <Login />;
};

export default RedirectToHomeIfAuthenticated;
