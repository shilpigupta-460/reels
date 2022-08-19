import React, { useContext } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { Outlet, Navigate } from "react-router-dom";



const PrivateRoutes = ({ children }) => {
    const { user } = UserAuth()

    return (

        user ? children : <Navigate to="/login" />



    )
}

export default PrivateRoutes