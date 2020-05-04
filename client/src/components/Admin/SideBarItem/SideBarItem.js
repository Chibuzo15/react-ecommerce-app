import React from 'react';
import classes from './SideBarItem.module.css';

const sideBarItem = (props) => {
    return(
        <div 
        onClick = {() => props.clickedItem(props.children)}
        className={classes.SidebarItem}>
            {props.children}
        </div>
    )
}

export default sideBarItem;