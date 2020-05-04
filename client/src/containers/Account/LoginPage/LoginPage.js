import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Button from '../../../components/UI/Button/button';
import classes from './LoginPage.module.css';
import { NavLink } from 'react-router-dom'
import * as actionTypes from '../../../store/actions/actions'

class LoginPage extends Component{
    state={
        email : '',
        password : '',
    }
    

    handlePassChange = (event) => {
        this.setState({password: event.target.value})
    }

    handleEmailChange = (event) => {
        this.setState({email : event.target.value})
    }

    render(){
        if (this.props.loggedIn) {
            return <Redirect to="/" />;
        }
        return(
            <div className={classes.PageWrapper}>
                <input 
                onChange={this.handleEmailChange}
                value={this.state.email}
                className={classes.Input}
                type='email' 
                name='email'
                placeholder='Email address'
                />
                <input 
                onChange={this.handlePassChange}
                value={this.state.password}
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
                handleClick={() => this.props.login(this.state)}
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
        login: (userObj) => dispatch({type: actionTypes.LOGIN, userObj: userObj})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);