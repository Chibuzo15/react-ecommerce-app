import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '../../../store/actions';

import classes from './Profile.module.css';
import Button from '../../../components/UI/Button/button';

import { Redirect } from 'react-router-dom';

class Profile extends Component{
    render(){
        if (!this.props.loggedIn) {
            return <Redirect to="/login" />;
        }

        return(
            <div>
                <div className={classes.PageTitle}> My Account </div>
                <div>Welcome {this.props.userObj.email}</div>
                <div className={classes.Wrapper}>
                    <div className={classes.Options}>
                        <div>Orders</div>
                        <div>Favourites</div>
                        <div>Personal data</div>
                        <div>Addresses</div>
                        <div>
                            <Button
                            handleClick={this.props.logout}
                            >Sign out</Button></div>
                    </div>
                    <div className={classes.OptionDetails}></div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loggedIn : state.loggedIn,
        userObj : state.user
    }
}
const mapDispatchToProps = {
    logout
}

export default connect( mapStateToProps, mapDispatchToProps)(Profile);