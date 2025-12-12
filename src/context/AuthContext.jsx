import { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage('crm_session', null);
    const [users, setUsers] = useLocalStorage('crm_users', []);

    // Initialize admin user if no users exist
    useEffect(() => {
        if (users.length === 0) {
            const adminUser = {
                id: uuidv4(),
                name: 'Admin User',
                email: 'admin@crm.com',
                role: 'Admin',
                password: 'admin', // In real app, hash this
                avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff'
            };
            setUsers([adminUser]);
        }
    }, [users, setUsers]);

    const login = (email, password) => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const register = (name, email, password) => {
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'User already exists' };
        }
        const newUser = {
            id: uuidv4(),
            name,
            email,
            role: 'Staff', // Default role
            password,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`
        };
        setUsers([...users, newUser]);
        setUser(newUser);
        return { success: true };
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}
