import React from 'react';

import NavigationItem from './NavgationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    // ...
    let attachClasses = [classes['NavigationItemsMobile'], classes['Close']];

    if (props.showMobile){
        attachClasses = [classes['NavigationItemsMobile'], classes['Open']]
    }

    const NavigationItemsARR = [
        {
            name: 'whats new'
        },
        {
            name: 'dresses'
        },
        {
            name: 'lookbook'
        },
        {
            name: 'campaign'
        },
        {
            name: 'sale'
        },
    ]

    const NavigationItems = NavigationItemsARR.map(nav => {
        return <NavigationItem key={nav.name}> {nav.name.toUpperCase()} </NavigationItem>
    })

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

export default navigationItems