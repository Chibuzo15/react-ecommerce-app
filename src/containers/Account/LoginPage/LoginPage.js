import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/button';
import classes from './LoginPage.module.css';
import { NavLink } from 'react-router-dom'
import * as actionTypes from '../../../store/actions'

class LoginPage extends Component{
    
    render(){
        console.log(this.props.loggedIn)
        return(
            <div className={classes.PageWrapper}>
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
                <div className={classes.Forgot}>
                    <NavLink
                    to=''
                    >
                    Forgot password
                    </NavLink>
                </div>
                <Button
                handleClick={this.props.login}
                btnType='Cart'
                >
                    SIGN IN
                </Button>
                <div 
                className={classes.CreateNew}>
                    <NavLink
                    to='/signup'
                    >
                    Create new account?
                    </NavLink>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn : state.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return{
        login: () => dispatch({type: actionTypes.LOGIN})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);