import React from 'react';
import { NavLink } from 'react-router-dom'

import NavigationItem from './NavgationItem/NavigationItem';
import classes from './NavigationItems.module.css';

// get our fontawesome imports
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';

const NavigationItems = (props) => {

    // ...
    let attachClasses = [classes['NavigationItemsMobile'], classes['Close']];

    if (props.showMobile){
        attachClasses = [classes['NavigationItemsMobile'], classes['Open']]
    }

    const NavigationItemsARR = [
        {
            name: 'whats new',
            link: '/whats-new'
        },
        {
            name: 'dresses',
            link: '/dresses'
        },
        {
            name: 'lookbook',
            link: '/lookbook'
        },
        {
            name: 'sale',
            link: '/sale'
        },
    ]

    //Navigation items array
    let NavigationItems = NavigationItemsARR.map(nav => {
        return <NavigationItem 
        clicked={props.showMobile ? props.clicked : null}
        link={nav.link}
        key={nav.name}> {nav.name.toUpperCase()} </NavigationItem>
    })

    if (props.showMobile){
        //Add account icon to menu
        if(!props.loggedIn){
            NavigationItems.push(
                <NavLink 
                //only set Onclick to click prop if show mobile is true
                onClick={props.showMobile ? props.clicked : null}
                to='/login'
                key='icons' 
                className={classes['Accountbarmobile']}>
                    <span>< FontAwesomeIcon className={classes['Icon']} icon={faUser} />SIGN IN</span>
                </NavLink>
            )
        }else{
            NavigationItems.push(
                <NavLink 
                //only set Onclick to click prop if show mobile is true
                onClick={props.showMobile ? props.clicked : null}
                to='/my-account'
                key='icons' 
                className={classes['Accountbarmobile']}>
                    <span>< FontAwesomeIcon className={classes['Icon']} icon={faUser} />MY ACCOUNT</span>
                </NavLink>
            )
        }
        
    }


    return (
        <div>
            <ul className={classes['NavigationItems']}>
                {NavigationItems}
            </ul>
            <ul className={attachClasses.join(' ')}>
                {NavigationItems}
            </ul>
        </div>
        

    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.customer.loggedIn
    }
}

export default connect(mapStateToProps)(NavigationItems);