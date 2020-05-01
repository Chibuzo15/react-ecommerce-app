import React from 'react';
import classes from './footerItem.module.css'

const footerItem = (props) => {
    return(
        <div className={classes['footerItem']}>
            {props.children}
        </div>
    )
}

export default footerItem;