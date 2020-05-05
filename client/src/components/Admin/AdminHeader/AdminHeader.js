import React from 'react';
import classes from './AdminHeader.module.css';
import { useHistory } from 'react-router-dom';

const AdminHeader = () => {

    let history = useHistory();

    return (
        <div className={classes.AdminPanel}>Welcome Admin
            <div className={classes.PanelItems}> 
                <div
                onClick = {() => history.push('/site-admin')}
                >Dashboard</div>
                <div
                
                >Logout</div>
            </div>
        </div>
    )
}

export default AdminHeader;