import { useState, useEffect, useContext, createContext } from 'react';
import router from 'next/router';
import { auth } from '@/constants/firebaseConfig';

export const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext)

const withAuth = Component => props => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            <Component {...props} />
        </AuthContext.Provider>
    )
};

export default withAuth;