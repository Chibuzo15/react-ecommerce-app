import React from 'react';
import classes from './Product.module.css';

const eachProduct = (props) => {
    return (
        <div className={classes.Product}>
            <div>{props.name}</div>
            <div>{props.price}</div>
        </div>
    )
}

export default eachProduct;