import { useState, useEffect, useContext, createContext } from 'react';
import router from 'next/router';
import { auth } from '@/constants/firebaseConfig';
import DefaultLayout from "@/components/DefaultLayout";

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
            <DefaultLayout>
                <Component {...props} />
            </DefaultLayout>
        </AuthContext.Provider>
    )
};

export default withAuth;