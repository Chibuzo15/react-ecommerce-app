import React, { Component } from 'react';
import logoImg from './logo.png';
import classes from './Logo.module.css';
import { useHistory } from 'react-router-dom'

const Logo = (props) => {
    
    const history = useHistory();

    // handleClick = () => {
    //     history.push("/");
    // }
 
    
        return(
            <img 
            onClick={() => history.push('/')}
            className={classes['Logo']}
             src={logoImg} alt="logo" />
        )
    
}

export default Logo;