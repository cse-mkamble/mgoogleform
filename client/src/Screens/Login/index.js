import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import { Box, AppBar, Button, CssBaseline, Grid, TextField, Toolbar, Typography, Avatar } from '@mui/material';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';

import { login, isAuthenticated, logout, loginAsGuest } from '../../Redux/actions/authAction';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Login(props) {
    const classes = useStyles();
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    let history = useHistory();
    const [isLogined, setIsLogined] = useState(false);
    const { from } = props.location.state || { from: { pathname: '/' } }

    const initialState = { name: '', email: '', };
    const [userData, setUserData] = useState(initialState);
    const { name, email } = userData;

    useEffect(() => {
        setIsLogined(isAuthenticated());
    }, []);


    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        dispatch(login(userData, from.pathname));
    }

    const handleLoginAsGuest = () => {
        dispatch(loginAsGuest());
    }

    const handleLogout = (response) => {
        dispatch(logout());
        setIsLogined(false);
    }

    return (<div>
        <CssBaseline />
        <div style={{ display: 'flex', flexGrow: 1, textAlign: 'start' }}>
            <AppBar position="relative" color="inherit">
                <Toolbar>
                    <ViewListRoundedIcon className={classes.icon} onClick={() => { history.push('/') }} />
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>Forms</Typography>
                </Toolbar>
            </AppBar>
        </div>
        <br></br>
        <main>
            <Typography component="h1" variant="h5" textAlign="center" >Login</Typography>
            <br></br>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {isLogined ? "" : <div>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box component="form" onSubmit={handleSubmitLogin} noValidate sx={{ mt: 1, maxWidth: '300px' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="name"
                                name="name"
                                autoComplete="name"
                                onChange={handleChangeInput}
                                value={userData.name}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChangeInput}
                                value={userData.email}
                            />


                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 1, mb: 1 }}
                                disabled={userData.name && userData.email ? false : true}
                            >
                                submit
                            </Button>
                        </Box>
                    </Box>
                </div>}
                <br></br>
                <br></br>
                <div style={{ textAlign: 'center' }} >
                    {isLogined ? (<div>
                        <p>Already logged in. Want to logout?</p>
                        <Button
                            variant="contained"
                            style={{ textTransform: "none" }}
                            onClick={handleLogout}>Logout </Button>
                    </div>) : (<Button
                        onClick={handleLoginAsGuest}
                        variant="contained"
                        style={{ textTransform: "none" }}
                        startIcon={<Avatar src={"https://static.thenounproject.com/png/3244607-200.png"} />} >
                        Login as Guest(Anonymous)
                    </Button>
                    )}
                </div>
                <br></br>
                <br></br>
            </div>
        </main>
    </div>);
}