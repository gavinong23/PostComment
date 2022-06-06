import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { List, ListItem, ListItemText, SwipeableDrawer } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginDialogComponent from './LoginDialog.component';
import { LoginUser } from '../models/LoginUser';
import { useAppDispatch, useAppSelector } from '../hooks/Hooks';
import { login, logout } from '../slices/AuthenticateSlice';

export default function Header() {
    const [open, setOpen] = useState<boolean>(false);
    const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.user);

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
            setLoginDialogOpen(false);
        }
    }, [isAuthenticated]);

    const onLoginButtonClick = () => {
        setLoginDialogOpen(true);
    };

    const onLoginDialogClose = () => {
        setLoginDialogOpen(false);
    }

    const onSignInButtonClick = (loginUser: LoginUser) => {
        dispatch(login(loginUser));
    }

    const onLogoutButtonClick = () => {
        dispatch(logout());
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <LoginDialogComponent onClose={onLoginDialogClose} open={loginDialogOpen} onSignInButtonClick={onSignInButtonClick} />
            <AppBar
                sx={{ backgroundColor: '#1877F2', color: 'white', padding: '4px', height: "70px" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {location.pathname === '/' ? <></> : <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon />
                    </IconButton>}
                    <SwipeableDrawer
                        anchor="left"
                        open={open}
                        onClose={() => { setOpen(false) }}
                        onOpen={() => {}}>
                        <Box sx={{ width: 250 }}>
                            <List>
                                <Link to="/" style={{ textDecoration: 'none' }}>
                                    <ListItem button onClick={() => { setOpen(false) }}>
                                        <ListItemText primary={'Home'} />
                                    </ListItem>
                                </Link>
                            </List>
                        </Box>
                    </SwipeableDrawer>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MetaBook
                    </Typography>
                    {
                        !isAuthenticated ? 
                        (<Button color="inherit" onClick={onLoginButtonClick}>
                            <span>Login</span>
                        </Button>) 
                        : <Button color="inherit" onClick={onLogoutButtonClick}>
                            <span>Logout</span>
                        </Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}