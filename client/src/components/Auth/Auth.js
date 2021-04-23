import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, Button } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import LockOutlineIcon from '@material-ui/icons/LockOutlined'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signUp, signIn } from '../../actions/auth'

import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'

const initialState = {
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const classes = useStyles()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignup) {
            dispatch(signUp(formData, history))
        }else {
            dispatch(signIn(formData, history))

        }
    }
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    
    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
        setShowPassword(false)
    }
    
    const googleSuccess = async(res) => {
        const result = res?.profileObj
        const token = res?.tokenId

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    
    const googleFailure = (error) => {
        console.log(error)
        console.log("Google sign In was unsuccessful. Try again later")
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlineIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input 
                                        name="firstName" 
                                        label="First Name"
                                        handleChange={handleChange}
                                        autoFocus
                                        half
                                    />
                                    <Input 
                                        name="lastName" 
                                        label="Last Name"
                                        handleChange={handleChange}
                                        half
                                    />
                                </>
                            )
                        }
                        <Input 
                            name="email" 
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input 
                            name="password" 
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        { isSignup && 
                            <Input 
                                name="confirmPassword" 
                                label="Confirm Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                            />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign up' : 'Sign in' }
                    </Button>
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOGLE_AUTH_ID}
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained" startIcon={<Icon />} >
                                Google Sing In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
