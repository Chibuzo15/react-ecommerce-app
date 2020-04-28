import React, { Component } from 'react';

import Logo from './Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems'
import classes from './Header.module.css';
import AccountBar from './Account/AccountBar';
import DrawerToggle from './DrawerToggle/DrawerToggle';

class Header extends Component {
    state = {
        clickedToggle : false
    }

    drawerToggleHandler = () => {
        this.setState((prevState) => ({
            clickedToggle : !prevState.clickedToggle
        }))
    }

    render(){
        return (
            <div className={classes['Header']}>
                <div className= {classes['Topbar']}>
                    <DrawerToggle
                    clicked = {this.drawerToggleHandler}
                    showMenu = {this.state.clickedToggle}
                    />
                    <Logo/>
                    <AccountBar/>
                </div>
                <div>
                    <NavigationItems
                    showMobile = {this.state.clickedToggle}
                    />
                </div>
            </div>
        )
    }
}

export default Header;