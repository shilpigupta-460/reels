import React, { useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import { database, storage } from '../firebase';

export default function UploadFile(props) {
    console.log(props.user);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
     //const [file, setFile] = useState(null);

    const handleChange = async (file) => {
        if (file == null) {
            setError('Please Upload file first')
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }
        if (file.size / (1024 * 1024) > 100) {
            setError('Size too big')
            setTimeout(() => {
                setError('')
            }, 2000)
            return;

        }
        const uid = uuidv4()
        setLoading(true);
        const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
        uploadTask.on('state_changed', fn1, fn2, fn3);
        // f1 for progress
        function fn1(snapshot) {
            let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            console.log(`upload progress${progress}`);
        } setLoading(true)
        // f2 for error
        function fn2(error) {
            setError(error)

            setTimeout(() => {
                setError('')
            }, 4000)

            setLoading(false)
            return;
            // console.log(error);
        }
        // f3 for complete works
        function fn3() {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log(url);
                let obj = {
                    likes: [],
                    comments: [],
                    pId: uid,
                    pUrl: url,
                    uName: props.user.fname,
                    uProflie: props.user.profileUrl,
                    userId: props.user.userId ,
                    createAt: database.getTimeStamp
                }
                database.posts.add(obj).then(async(ref)=>{
                    let res = await database.users.doc(props.user.userId).update({
                        postIds : props.user.postIds!=null ? [...props.user.postIds,ref.id] : [ref.id]
                    })
                }).then(()=>{
                    setLoading(false)
                }).catch((err)=>{
                    setError(err)
                    setTimeout(()=>{
                        setError('')
                    },2000)
                    setLoading(false)
                })
            })
            // setLoading(false);
        }
}

    //             database.posts.add(obj).then((ref) => {
    //                 let res =  database.users.doc(props.user.userId).update({
    //                     postIds: props.user.postIds !== null ? [...props.user.postIds, ref.id] : [ref.id]
    //                 })
    //             }).then(() => {
    //                 setLoading(false)
    //             })
    //                 .catch((err) => {
    //                     setError(error)
    //                     setTimeout(() => {
    //                         setError('')
    //                     }, 4000)
    //                     setLoading(false)
    //                     return;
    //                 })
    //         })
    //         setLoading(false)
    //     }
    // }

    return (
        <div>{
            error !== '' ? <Alert severity="error" margin="dense" >{ error }</Alert>
                : <>
                    <input type="file" accept="video" id="upload" onChange={ (e) => { handleChange(e.target.files[0]) } }

                        style={ { display: 'none' } } />
                    <label htmlFor="upload" >
                        <Button variant="outlined" color="secondary"
                            component="span"
                            disabled={ loading }>
                            &nbsp; Upload Video
                        </Button>
                    </label>
                    { loading && <LinearProgress color="secondary" style={ { marginTop: "3%" } } /> }
                </> }

        </div>
    )
}

