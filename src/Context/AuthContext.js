import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,   // check user loggIn and protected route
    signOut
}
    from "firebase/auth";
const AuthContext = React.createContext();


export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);


    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);

    }
    // componentDid Mount
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((currentUser) => {

            setUser(currentUser);
            console.log(user)
            setLoading(false);

        })
        // componentDidUnMount
        return () => {
            unsub();
        }
    }, [user])
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);

    }
    const forgetPassword = (email) => {
        auth.sendPasswordResetEmail(email).then(() => {
            setUser(null);
        })

    }
    // function forgetPassword(email) {
    //     return auth.sendPasswordResetEmail(email)

    // }
    const signout = () => {
        auth.signOut()
        // setUser(null);
    }




    const store = {
        user,
        signup,
        login,
        signout,
        forgetPassword,
    }
    return (
        <AuthContext.Provider value={ store }>
            { !loading && children }
        </AuthContext.Provider>
    )
}
export const UserAuth = () => {   // make our context UserContext avaliable throughtout app
    return useContext(AuthContext)
}