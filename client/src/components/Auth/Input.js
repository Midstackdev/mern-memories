import React from 'react'
import { Grid, TextField, InputAdornment, IconButton, Typography } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'


const Input = ({ name, handleChange, label, autoFocus, type, hanleShowPassword, half}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField 
                name={name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={hanleShowPassword}>
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input
