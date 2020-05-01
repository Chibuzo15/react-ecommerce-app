import React, { Component } from 'react';
import classes from './SignUpPage.module.css';
import { NavLink } from 'react-router-dom';
import Button from '../../../components/UI/Button/button';

class SignUpPage extends Component{

    render(){
        return(
            <div className={classes.LoginPage}>
                <div className={classes.Name}>
                    <input 
                    className={classes.Input}
                    name='firstName' type='text' placeholder='First name' />
                    <input 
                    className={classes.Input}
                    name='lastName' type='text' placeholder='Last name' />
                </div>
                <input 
                className={classes.Input}
                type='email' 
                name='email'
                placeholder='Email address'
                />
                <input 
                className={classes.Input}
                type='password' 
                name='password'
                placeholder='password'
                />
                
                <Button
                btnType='Cart'
                >
                    CREATE ACCOUNT
                </Button>
                <div className={classes.CreateNew}>
                    <NavLink
                    to='/login'
                    >
                    Already have an account? login
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default SignUpPage;