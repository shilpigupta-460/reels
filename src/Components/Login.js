import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import "pure-react-carousel/dist/react-carousel.es.css";
import { styled } from '@mui/material/styles'; // 1) styleing way in @mui
import "./login.css";
import mobile from "../assert/mobile.png";
import logo from "../assert/logo.png";
import img1 from "../assert/img1.png";
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    Image,
} from "pure-react-carousel"; // carousel

export default function Login() {

    // console.log(store);
    const styles = styled({
        //2)
        text1: {
            color: "grey",
            textAlign: "center",
            cursor: "pointer",
        },
        text2: {
            textAlign: "center",
        },
        card2: {
            marginTop: "3%",
            height: "3vh",
        },
    })
    const classes = styles(); // 3)
    const store = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const { login } = useContext(AuthContext);


    const handleforgetP = () => {
        setLoading(true);
        history("/reset");
        //console.log(" done");
    };

    // useEffect(() => {
    //     if (user)
    //         history("/");
    //     console.log(user);
    // }, [user, history]);

    const handleLogin = async () => {
        try {
            setError(" ");
            setLoading(true);
            let user = await login(email, password);

            setLoading(false);
            history("/");

            // ((userCredential) => {
            //     const user = userCredential.userObj;
            //     console.log("user");
            // })()
        } catch (err) {
            setError(err);
            setLoading(false);
            setTimeout(() => {
                setError("");
            }, 4000);

            console.log(error);
        }
    };

    return (
        <div className="loginContainer">
            <div
                className="imgCar"
                style={ { backgroundImage: `url(${mobile})`, backgraoundSize: "cover" } }
            >
                <div className="car">
                    <CarouselProvider
                        naturalSlideWidth={ 100 }
                        naturalSlideHeight={ 125 }
                        totalSlides={ 3 }
                    >
                        <Slider>
                            <Slide index={ 0 }>
                                <Image src={ img1 } />
                            </Slide>
                            <Slide index={ 1 }>
                                <Image src={ logo } />
                            </Slide>
                            <Slide index={ 2 }>
                                <Image src={ logo } />
                            </Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>

            <div className="loginCard ">
                <Card variant="outlined">
                    <div className="logo">
                        <img src={ logo } alt="img" />
                    </div>
                    <CardContent>
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
                        <Typography className={ classes.text2 } color="primary">
                            <Link
                                to="/reset"
                                style={ { textDecoration: "none" } }
                                onClick={ handleforgetP }
                            >
                                { " " }
                                Forgot Password?{ " " }
                            </Link>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            fullWidth
                            variant="contained"
                            onClick={ handleLogin }
                            dislabed={ loading }
                        >
                            Login
                        </Button>
                    </CardActions>
                    <CardContent></CardContent>
                </Card>
                <Card className={ classes.card2 } variant="outlined">
                    <CardContent>
                        <Typography className={ classes.text1 } variant="outlined">
                            Don't have account?
                            <Link to="/signup" style={ { textDecoration: "none" } }>
                                { " " }
                                Signup
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
