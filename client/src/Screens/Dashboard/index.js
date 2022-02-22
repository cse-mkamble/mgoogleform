import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton, Typography, InputBase, MenuItem, Menu, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

import Forms from '../../Components/Form/Forms';

import { logout } from '../../Redux/actions/authAction';
import formService from '../../Redux/actions/formAction';

const Title = styled(Typography)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        display: 'block',
    },
}));

const SectionDesktop = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const SectionMobile = styled(Box)(({ theme }) => ({
    display: 'flex',
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

export default function Dashboard() {
    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();
    let history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const [formTitle, setFormTitle] = useState("");
    const [formDescription, setFormDescription] = useState("");

    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(auth.user);
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleClickOpen}>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <AddRoundedIcon />
                </IconButton>
                <p>Create </p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    aria-label="account of current user"
                    color="inherit"
                >
                    <AccountCircleRoundedIcon />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    const cancelAddForm = () => {
        handleClose();
        setFormTitle("");
        setFormDescription("");
    }

    const createForm = () => {
        var data = {
            name: formTitle,
            description: formDescription,
            createdBy: user._id
        }
        if (data.name !== "") {
            formService.createForm(data)
                .then((result) => {
                    console.log(result);
                    history.push("/form/" + result._id);

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
        }
    }

    const handleLogout = () => {
        var logoutConfirmation = window.confirm("Really want to logout?");
        if (logoutConfirmation) {
            dispatch(logout());
            history.push("/login");
        }
    }

    return (<Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
                <Title variant="h6" noWrap>Forms</Title>
                <Box sx={{ flexGrow: 1 }} />
                <SectionDesktop>
                    <IconButton
                        aria-label="Create new form"
                        color="inherit"
                        onClick={handleClickOpen}
                    ><AddRoundedIcon /></IconButton>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        color="inherit"
                        onClick={handleLogout}
                    ><AccountCircleRoundedIcon /></IconButton>
                </SectionDesktop>
                <SectionMobile>
                    <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    ><ExpandMoreRoundedIcon /></IconButton>
                </SectionMobile>
            </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <div>
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create Form</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Creating  a new empty form, just add form name and description if you want.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Form Name"
                            type="text"
                            fullWidth={false}
                            value={formTitle}
                            onChange={(e) => { setFormTitle(e.target.value) }}
                        />
                        <br></br>
                        <TextField
                            margin="dense"
                            id="description"
                            label="Form description"
                            type="text"
                            fullWidth
                            value={formDescription}
                            onChange={(e) => { setFormDescription(e.target.value) }}
                        />
                        <br></br>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cancelAddForm} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={createForm} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div style={{ marginTop: "10px" }}>

                <Forms userId={user._id} />
            </div>
        </div>
    </Box>);
}