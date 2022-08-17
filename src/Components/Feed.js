import React from 'react'
import logo from '../assert/logo.png';
import { AuthContext } from '../Context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UploadFile from "./UploadFile"
import { database } from "../firebase"
import Posts from "./Posts"
function Feed() {
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    // useEffect(() => {
    //     const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
    //         setUserData(snapshot.data())
    //     })
    //     return () => { unsub() }
    // }, [user])
    // const handleLogout = async () => {
    //     try {
    //         setError(" ")
    //         setLoading(true)
    //         let user = await logout();
    //         setLoading(false)

    //         history('/login')
    //         console.log('logout done');
    //         // .then((userCredential) => {
    //         //const user = userCredential.userObj;

    //         // })
    //     }
    //     catch (err) {

    //         setError(err)
    //         setTimeout(() => {
    //             setError('')
    //         }, 4000)
    //         setLoading(false)
    //         // console.log(error);


    //     }
    // }
    return (
        <>
            <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 20 } }>

                <div className="container" style={ { width: '50%', border: '1px solid black' } }>
                    <div >
                        <img src={ logo } style={ { width: '20%' } } />
                    </div>

                    <h1> feed</h1>

                    <button onClick={ logout() }><Link to="/login"> Logout</Link></button>
                </div>
                <UploadFile user={ userData } />
                {/* <Posts user={ userData } /> */ }
            </div>
        </>


    )
}

export default Feed