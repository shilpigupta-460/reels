import React from 'react'
import logo from '../assert/logo.png';
import { UserAuth } from '../Context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UploadFile from "./UploadFile"
import { database } from "../firebase"
import Posts from "./Posts"
function Feed() {
    const { user, signout } = UserAuth();
    const [userData, setUserData] = useState(user)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    console.log(user);

    const handleLogout = async () => {

        try {
            setError(" ")
            setLoading(true)
            await signout();
            setLoading(false)
            // setUserData('')

            history('/login')


        }
        catch (err) {

            setError(err)
            setTimeout(() => {
                setError('')
            }, 4000)
            setLoading(false)
            // console.log(error);


        }
    }
    return (
        <>
            <div style={ { display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 20 } }>

                <div className="container" style={ { width: '50%', border: '1px solid black' } }>
                    <div >
                        <img src={ logo } style={ { width: '20%' } } />
                    </div>

                    <h1> User Email:{ user && user.email }</h1>

                    <button onClick={ signout }><Link to="/login"> Logout</Link></button>
                </div>
                <UploadFile user={ user } />
                <Posts user={ userData } />
            </div>
        </>


    )
}

export default Feed