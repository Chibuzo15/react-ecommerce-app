import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
    return(
        <li 
        onClick={props.clicked}
        className={classes['NavigationItem']}>
            <NavLink
            to={props.link}
            exact = {props.exact}
            >
            {props.children}
            </NavLink>
        </li>
    )
}

export default navigationItem