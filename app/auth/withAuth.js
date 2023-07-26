import React, { useEffect } from 'react';
import router from 'next/router';
import { auth } from '@/constants/firebaseConfig';

const withAuth = Component => props => {
    useEffect(() => {
        auth.onAuthStateChanged(authUser => {
            if (!authUser) {
                router.push('/signin');
            }
        });
    }, []);

    return (
        <div>
            <Component {...props} />
        </div>
    )
};

export default withAuth;