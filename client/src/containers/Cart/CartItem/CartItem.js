import React from 'react';
import classes from './CartItem.module.css';

const cartItem = (props) => {
    return(
        <div className={classes.CartItem}>
            <div className={classes.Details}>
                <div className={classes.Name}>
                {props.children.name}
                </div>
                <div className={classes.Price}>
                    {props.children.price}
                </div>
                <div className={classes.Quantity}>
                {props.children.quantity}
                </div>
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