import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CssBaseline, Container, CircularProgress } from '@mui/material';

import OneForm from './OneForm';
import formService from '../../Redux/actions/formAction';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

export default function Forms(props) {
    const classes = useStyles();
    const { auth } = useSelector(state => state);

    const [user, setUser] = React.useState({})
    const [forms, setForms] = React.useState([])
    const [loadingForms, setLoadingForms] = React.useState(true);

    React.useEffect(() => {
        setUser(auth.user);
    }, []);

    React.useEffect(() => {
        if (props.userId === undefined) {
            //console.log("this shit is undefined");
        } else {
            // console.log(props.userId);
            formService.getForms(props.userId).then((forms2) => {
                setForms(forms2);
                setLoadingForms(false);
            },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage);
                }
            );
            console.log(forms);
        }
    }, [props.userId])

    return (<div>
        <div>
            <CssBaseline />
            {loadingForms ? (<CircularProgress />) : ""}
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={6}>
                    {forms.map((form, i) => (
                        <OneForm formData={form} key={i} />
                    ))}
                </Grid>
            </Container>
        </div>
    </div>);
}