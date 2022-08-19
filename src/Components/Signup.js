import React, { useState, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
//import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import "./signUp.css";
import logo from "../assert/logo.png";
import { styled } from "@mui/material/styles"; // 1) styleing way in @mui
import { Store } from "@material-ui/icons";

import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
import { database, storage } from "../firebase";

export default function Signup() {
    const styles = styled({
        //2)
        text1: {
            color: "grey",
            textAlign: "center",
        },
        card2: {
            marginTop: "3%",
            height: "3vh",
        },
    });
    // const store = useContext(AuthContext);
    // const { store } = useAuthValue();

    const classes = styles(); // 3)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const { signup } = UserAuth();

    const handleClick = async () => {
        if (file == null) {
            setError("Please Upload  profile image first");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
        try {
            setError("");
            setLoading(true);
            let userObj = await signup(email, password);
            history("/");
            // console.log(userObj);
            let userId = userObj.user.uid;
            console.log(`userId: ${userId}`);

            const uploadTask = storage.ref(`/users/${userId}/ProfileImage`).put(file);
            uploadTask.on("state_changed", fn1, fn2, fn3);

            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`upload progress${progress}`);
            }
            function fn2(error) {
                setError(error);

                setTimeout(() => {
                    setError("");
                }, 4000);
                setLoading(false);
                return;

            }

            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {

                    database.users.doc(userId).set({
                        email: email,
                        userId: userId,
                        fname: fname,
                        profileUrl: url,
                        createdAt: database.getTimeStamp,
                    });
                    console.log(url);
                });
                setLoading(false);

            }
        }
        catch (err) {
            console.log(err.message);
            setError(err);
            setTimeout(() => {
                setError("");
            }, 4000);

            console.log(file);
        }
    };

    return (
        <div className="signUpContainer">
            <div className="signUpCard ">
                <Card variant="outlined">
                    <div className="logo">
                        <img src={ logo } alt="img" />
                    </div>
                    <CardContent>
                        <Typography className={ classes.text1 } variant="subtitle">
                            SignUp to see photos and videos from friends
                        </Typography>
                        { error !== "" && (
                            <Alert severity="error" margin="dense">
                                { error }
                            </Alert>
                        ) }
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            size="small"
                            value={ email }
                            onChange={ (e) => {
                                setEmail(e.target.value);
                            } }
                        />
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            size="small"
                            value={ password }
                            onChange={ (e) => {
                                setPassword(e.target.value);
                            } }
                        />
                        <TextField
                            id="outlined-basic"
                            label="Full-name"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            size="small"
                            value={ fname }
                            onChange={ (e) => {
                                setFname(e.target.value);
                            } }
                        />
                        <Button
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            component="label"
                        >
                            Upload Profile Image
                            <input
                                type="file"
                                active="image"
                                hidden={ true }
                                onChange={ (e) => {
                                    setFile(e.target.files[0]);
                                } }
                            />
                        </Button>
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            fullWidth
                            variant="contained"
                            disabled={ loading }
                            onClick={ handleClick }
                        >
                            <Link to="/" className="underline">Sign up</Link>
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={ classes.text1 } variant="subtitle">
                            By singing up, you agree to our Terms and Conditions
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={ classes.card2 } variant="outlined">
                    <CardContent>
                        <Typography className={ classes.text1 } variant="outlined">
                            Having account?{ " " }
                            <Link to="/login" style={ { textDecoration: "none" } }>
                                { " " }
                                Login{ " " }
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
