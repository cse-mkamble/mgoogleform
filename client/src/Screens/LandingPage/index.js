import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import { AppBar, Button, CssBaseline, Grid, Toolbar, Typography, Container, Paper } from '@mui/material';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        marginRight: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
    mainFeaturedPost: {
        position: 'relative',
        marginBottom: theme.spacing(4),
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
}));

const cards = [];

export default function LandingPage() {
    const classes = useStyles();
    let history = useHistory();

    function loginClick() {
        history.push('/login')
    }

    return (<div>
        <CssBaseline />
        <div style={{ display: 'flex', flexGrow: 1, textAlign: 'start' }}>
            <AppBar position="relative" color='inherit' >
                <Toolbar>
                    <ViewListRoundedIcon className={classes.icon} />
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>Forms</Typography>
                    <Button color="inherit" onClick={loginClick}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
        <main style={{ textAlign: 'start' }}>
            <div>
                <Container>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Paper className={classes.mainFeaturedPost} >

                        <div className={classes.overlay} />
                        <Grid container>
                            <Grid item md={6}>
                                <div className={classes.mainFeaturedPostContent}>
                                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>Create Forms</Typography>
                                    <div>
                                        <Button variant="contained" color="primary" sx={{ mr: 1 }} onClick={loginClick}>
                                            Signup Now
                                        </Button>
                                        <Button variant="contained" color="primary" onClick={loginClick}>
                                            Login
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                    <br></br>
                    <br></br>
                    <br></br>
                </Container>
            </div>
        </main>
    </div>);
}