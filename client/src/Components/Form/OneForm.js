import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Paper, Grid } from '@mui/material';
import Moment from 'react-moment';

import GoogleForms from "../../Images/GoogleForms.jpg";

const useStyles = makeStyles((theme) =>
({
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
})
);

export default function OneForm(props) {
    const classes = useStyles();
    const [form, setForm] = React.useState({});

    React.useEffect(() => {
        setForm(props.formData);
    }, [props.formData])

    return (<Grid item xs={12} sm={6} md={3}>
        <Card className={classes.root}>
            <CardActionArea href={`/form/${form._id}`}>
                <CardMedia
                    className={classes.media}
                    image={GoogleForms}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {form.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {form.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Opened:  <Moment fromNow>{form.updatedAt}</Moment>
                    </Typography>

                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions> */}
        </Card>
    </Grid>);
}
