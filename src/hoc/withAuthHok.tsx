import React from 'react';
import { Navigate } from 'react-router-dom';
import { UseTypedSelector } from '../@types/types';

const WithAuth = (Component: React.FC) => {
    const IsAuth = (props: any) => {

        const isAuth = UseTypedSelector(state => state.AuthData.isAuth);
        return (
            <>
                {
                    isAuth ? 
                    <Component {...props}/>:
                    <Navigate replace to="/Login"/>
                }
            </>
        )
    };

    return IsAuth;
};

export default WithAuth;