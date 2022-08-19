import React, { useContext } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { Outlet, Navigate } from "react-router-dom";
import Login from './Login';



const PrivateRoutes = () => {
    const { user } = UserAuth();

    return (

        user ? <Outlet /> : <Navigate to="/login" />



    )
}

export default PrivateRoutes