import React, { useState, useContext, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField';
//import CloudUploadIcon from '@mui/@material-ui/icons/CloudIcon';
//import CloudUploadIcon from '@material-ui/icons/CloudUploadIcon';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { useAuthValue } from '../Context/AuthContext';
import "./signUp.css";
import logo from '../assert/logo.png';
import { styled } from '@mui/material/styles'; // 1) styleing way in @mui
import { Store } from '@material-ui/icons';

import { database, storage, } from '../firebase';

export default function forgotPasswaord() {
    const styles = styled({    //2) 
        text1: {
            color: 'grey',
            textAlign: 'center',
        },
        card2: {
            marginTop: '3%',
            height: '3vh'
        }

    })
    // const store = useContext(AuthContext);
    // const { store } = useAuthValue();

    const classes = styles(); // 3)
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const { forgetPassword } = useContext(AuthContext);

    const handleClick = async () => {
        if (email == null) {
            setError('Please enter Emial')
            setTimeout(() => {
                setError('')
            }, 2000)
            return;
        }
        try {
            setError("")
            setLoading(true)
            let userObj = await forgetPassword(email);
            setLoading(false)
            history('/login')

        }
        catch (err) {
            console.log(err);
            setError(err)
            setTimeout(() => {
                setError('')
            }, 4000)


        }

    }


    return (
        <div className="forgotContainer" >
            <div className="forgotCard ">
                <Card variant="outlined">
                    <div className="logo">
                        <img src={ logo } alt="img" />
                    </div>
                    <CardContent>
                        <Typography className={ classes.text1 } variant="subtitle" >
                            Forgot Password
                        </Typography>
                        { error !== '' && <Alert severity="error" margin="dense" >{ error }</Alert> }
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth margin="dense" size="small"
                            value={ email } onChange={ (e) => { setEmail(e.target.value) } } />
                    </CardContent>
                    <CardActions>
                        <Button color="primary" variant="contained" disable={ loading } onClick={
                            handleClick } ><Link to="/login" style={ { textDecoration: "none" } }> </Link>Send</Button>

                    </CardActions>

                </Card>

            </div>
        </div >
    );

}
