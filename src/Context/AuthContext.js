import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';


export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);


    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);

    }
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
    const logout = () => {
        auth.signOut()
        // setUser(null);
    }


    // componentDid Mount
    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user)
            // console.log(user)
            {
                setUser(user);
                setLoading(false);
            }
            else {
                setUser(null)
            }

        })
        // componentDidUnMount
        return () => {
            unsub();
        }
    }, [])

    const store = {
        user,
        signup,
        login,
        logout,
        forgetPassword,
    }
    return (
        <AuthContext.Provider value={ store }>
            { !loading && children }
        </AuthContext.Provider>
    )
}
// export function useAuthValue() {
//     return useContext(AuthContext)
// 
