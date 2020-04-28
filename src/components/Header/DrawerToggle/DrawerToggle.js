import React from 'react';
import classes from './DrawerToggle.module.css'

const drawerToggle = (props) => {

    let attachClasses = classes['DrawerToggle'];
    if(props.showMenu){
        attachClasses = [classes['DrawerToggle'], classes['open']].join(' ')
    }
    // let hamburger = <div className={classes['Hamburger']}>
    //                     <div></div>
    //                     <div></div>
    //                     <div></div>
    //                 </div>

    // let cross = <div className={classes['Cross']}>x</div>
    
    return(
        <div className={attachClasses} onClick={props.clicked}>
            {/* {props.showMenu ? cross : hamburger} */}
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
    
};

export default drawerToggle;