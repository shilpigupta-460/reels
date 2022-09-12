import React, { useState, useEffect } from 'react'
import { database } from "../firebase"
// import { doc, getDoc, orderBy } from "firebase/firestore";
import CircularProgress from '@mui/material/CircularProgress';
import Video from "./Video";
 import "./Posts.css"
 import Avatar from '@mui/material/Avatar';
// import Like from './Like'
// import ChatBubbleIcon from '@mui/material/ChatBubble';
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Like from './Like';
import { color } from '@mui/system';

function Posts({ userData }) {

    const [posts, setPosts] = useState(null)
    // useEffect(() => {
    //     let parr = []
    //     const unsub = database.posts.orderBy('createAt', 'desc').onSnapshot((querySnapShot) => {
    //         parr = []
    //         //     querySnapShot.forEach((doc) => {
    //         //         let data = { ...doc.data(), postId: doc.id }
    //         //         parr.push(data)

    //         // })
    //         querySnapShot.forEach((doc) => {
    //             parr.push({ ...doc.data(), id: doc.id });
    //         });
    //         setPosts(parr)
    //     })
        

    //     return unsub;
    //     console.log('post')

    // }, [])
    useEffect(()=>{
        let parr = []
        const unsub = database.posts.orderBy('createAt','desc').onSnapshot((querySnapshot)=>{
            parr = []
            querySnapshot.forEach((doc)=>{
                let data = {...doc.data(), postId:doc.id}
                parr.push(data)
            })
            setPosts(parr)
        })
        return unsub;
    },[])

    // const q = query(collection(db, "messages"), orderBy("xyz"));
    // onSnapshot(q, (snapshot) => {
    //     setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    // })

    return (
        <div>
             {
                posts ==null || userData ==null ? < CircularProgress/> :
                <div className="video-container">
                    {  
                     posts.map((post,index)=>(
                    <React.Fragment key={index}>
                         {console.log(post)}
                                <div className="videos">
                                    <Video src={post.pUrl} id={post.pId}/>
                                </div>
                                <div className="fa" style={ {display:" flex"}}>
                                 <Avatar src={userData.ProfileImage} />  
                                 <h4> { userData.fname}</h4>
                                </div>
                                <Like userData={userData} style={ {color:" white"}}/>
                    </React.Fragment>
                                  ))
                       }</div>}
        </div>
    )
}

export default Posts
