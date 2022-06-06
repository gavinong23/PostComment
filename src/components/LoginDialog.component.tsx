import { FC, useState } from 'react';

import {
    Box,
    Grid,
    TextField,
    InputLabel,
    Typography,
    Button,
    Dialog,
} from '@mui/material';
import { LoginUser } from '../models/LoginUser';

export interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
    onSignInButtonClick: (loginUser: LoginUser) => void;
}


const LoginDialogComponent: FC<LoginDialogProps> = (props: LoginDialogProps) => {

    const { open } = props;
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClose = () => {
        props.onClose();
    };

    const onSignInButtonClick = () => {
        const loginUser: LoginUser = {
          userName,
          password  
        };
        props.onSignInButtonClick(loginUser);
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <Box
                    sx={{

                        padding: "18px",
                        width: '500px',
                        height: '300px',
                        marginTop: 2,
                    }}
                >
                    <form>
                        <Grid container direction='column' justifyContent='flex-start'>
                            <Typography variant='h4' component='h1'>
                                Sign-In
                            </Typography>

                            <InputLabel
                                sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
                                htmlFor='username'
                            >
                                Username
                            </InputLabel>
                            <TextField
                                type='username'
                                name='username'
                                id='username'
                                variant='outlined'
                                size='small'
                                placeholder='Enter your username'
                                onChange={(e) => setUsername(e.target.value)}
                                value={userName}
                            />

                            <InputLabel
                                sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
                                htmlFor='password'
                            >
                                Password
                            </InputLabel>
                            <TextField
                                type='password'
                                name='password'
                                id='password'
                                variant='outlined'
                                size='small'
                                placeholder='Enter your password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            <Button
                                id='signin-btn'
                                variant='contained'
                                style={{
                                    marginTop: '36px',
                                    borderColor: '#a88734 #9c7e31 #846a29',
                                    textTransform: 'none',
                                }}
                                onClick={onSignInButtonClick}
                            >
                                Sign-In
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </Dialog>
        </>
    );
};

export default LoginDialogComponent;