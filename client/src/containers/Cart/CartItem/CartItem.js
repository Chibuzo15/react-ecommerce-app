import React from 'react';
import classes from './CartItem.module.css';

const cartItem = (props) => {
    return(
        <div className={classes.CartItem}>
            <div>
            {props.children}
            </div>
            <span
            className={classes.Remove}
            onClick= {props.remove}
            >
                REMOVE
            </span>
        </div>
    )
}

export default cartItem;