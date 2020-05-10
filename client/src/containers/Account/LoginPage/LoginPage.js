import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import Button from '../../../components/UI/Button/button';
import classes from './LoginPage.module.css';
import { NavLink } from 'react-router-dom'
import * as actions from '../../../store/actions/index'

class LoginPage extends Component{
    state={
        email : '',
        password : '',
    }
    
    handleLogin = () => {
        this.props.login(this.state)
        console.log('logging in')
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
                handleClick={this.handleLogin}
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
        loggedIn : state.customer.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return{
        login: (userObj) => dispatch(actions.login(userObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);