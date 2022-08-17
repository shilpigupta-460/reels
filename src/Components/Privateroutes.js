import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Outlet, Navigate } from "react-router-dom";



const PrivateRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);

    return (

        user ? children : <Navigate to="/login" />



    )
}

export default PrivateRoutes