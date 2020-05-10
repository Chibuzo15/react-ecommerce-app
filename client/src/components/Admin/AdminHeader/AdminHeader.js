import React from 'react';
import classes from './AdminHeader.module.css';
import { useHistory } from 'react-router-dom';

const AdminHeader = (props) => {

    let history = useHistory();

    return (
        <div className={classes.AdminPanel}>Welcome Admin
            <div className={classes.PanelItems}> 
                <div
                onClick = {() => history.push('/site-admin')}
                >Dashboard</div>
                <div
                onClick = {props.logout}
                >Logout</div>
            </div>
        </div>
    )
}

export default AdminHeader;