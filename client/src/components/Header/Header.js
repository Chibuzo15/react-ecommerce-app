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
                    <span className={classes.Drawer}>
                        <DrawerToggle
                        clicked = {this.drawerToggleHandler}
                        showMenu = {this.state.clickedToggle}
                        /></span>
                    <span className={classes.Logo}><Logo/></span>
                    <span className={classes.AccountBar}><AccountBar/></span>
                </div>
                <div>
                    <NavigationItems
                    clicked = {this.drawerToggleHandler}
                    showMobile = {this.state.clickedToggle}
                    />
                </div>
            </div>
        )
    }
}

export default Header;