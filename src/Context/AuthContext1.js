import { createContext, useContext, useEffect, useState } from 'react'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,   // check user loggIn and protected route
    signOut
}
    from "firebase/auth";
import { auth } from '../firebase'

const UserContext = createContext(); // creating context

export const AuthContextProvider = ({ children }) => {    //  creating context provider
    const [user, setUser] = useState({});

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // show the sign in user once
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
            console.log(user);
        })
        return () => {
            unsub();
        }
    }, [])

    const login = (email, password) => {
        return signInWithEmailAndPassword(email, password);
    }
    const signout = (email, password) => {
        return signOut(auth);
    }

    return (
        <UserContext.Provider value={ { user, createUser, signInUser, signout } }>
            { children }
        </UserContext.Provider>
    )
}
export const UserAuth = () => {   // make our context UserContext avaliable throughtout app
    return useContext(UserContext)
}
