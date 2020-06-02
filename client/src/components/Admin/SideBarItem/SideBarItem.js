import React from 'react';
import classes from './SideBarItem.module.css';

import { Link } from 'react-router-dom'

const sideBarItem = (props) => {
    return(
        <Link
        to={props.link}
        >
        <div 
        className={classes.SidebarItem}>
            {props.children}
        </div>
        </Link>
    )
}

export default sideBarItem;