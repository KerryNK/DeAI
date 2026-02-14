import { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check for existing session on mount
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            // Verify token and get user info
            apiClient.getCurrentUser()
                .then(userData => {
                    setUser(userData);
                    setLoading(false);
                })
                .catch(() => {
                    // Token invalid, clear it
                    localStorage.removeItem('auth_token');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const signup = async (email, password, username) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.signup(email, password, username);
            localStorage.setItem('auth_token', response.token);
            setUser(response.user);
            setLoading(false);
            return response;
        } catch (err) {
            setError(err.message || 'Signup failed');
            setLoading(false);
            throw err;
        }
    };

    const login = async (email, password, rememberMe = false) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiClient.login(email, password);
            localStorage.setItem('auth_token', response.token);
            if (rememberMe) {
                localStorage.setItem('remember_me', 'true');
            }
            setUser(response.user);
            setLoading(false);
            return response;
        } catch (err) {
            setError(err.message || 'Login failed');
            setLoading(false);
            throw err;
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await apiClient.logout();
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('remember_me');
            setUser(null);
            setLoading(false);
        }
    };

    const value = {
        user,
        loading,
        error,
        signup,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
