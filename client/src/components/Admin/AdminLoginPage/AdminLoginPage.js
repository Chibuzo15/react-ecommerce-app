import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../UI/Button/button';
import classes from './AdminLoginPage.module.css';
import { Redirect } from 'react-router-dom'

import * as actions from '../../../store/actions/index';

class AdminLogin extends Component {
    state = {
        userForm : {
            
        }
    }
    render () {
        // console.log(this.props.adminLoggedIn, 'Admin logged in')
        return (
            
            <div className={classes.Wrapper}>
                {this.props.adminLoggedIn ? <Redirect to = '/site-admin'/> : null}
                <div className={classes.Form}>
                Admin Page
                <Button 
                handleClick = {() => this.props.onAdminLogin()}
                >
                    Login
                </Button>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        adminLoggedIn : state.auth.adminLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdminLogin : () => dispatch(actions.adminLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);