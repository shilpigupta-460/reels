import React, { useState, useEffect } from 'react'
import { database } from "../firebase"
import { doc, getDoc } from "firebase/firestore";
import CircularProgress from '@mui/material/CircularProgress';
function Posts({ userData }) {

    const [posts, setPosts] = useState(null)
    useEffect(() => {
        let parr = []
        const unsub = database.posts.orderBy('createAt', 'desc').onSnapShot((querySnapShot) => {
            parr = []
            querySnapShot.forEach((doc) => {
                let data = { ...doc.data(), postId: doc.id }
                parr.push(data)
            })
            setPosts(parr)

        })
        return unsub;


    }, [])

    return (
        <div>
            { posts == null || userData == null ? <CircularProgress /> : <Posts /> }
        </div>
    )
}

export default Posts