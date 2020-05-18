import React from 'react';
import classes from './Dashboard.module.css'
import { Redirect } from 'react-router-dom';

const dashboard = (props) => {
    if(!props.adminLoggedIn){
        return <Redirect to='/site-admin/login' />
    }

    return(
        <div className={classes.Dashboard}>
            dashboard
        </div>
    )
}

export default dashboard;