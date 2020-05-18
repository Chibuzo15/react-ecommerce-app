import React from 'react';
import classes from './EachOrder.module.css'

const Order = (props) => {
    return (
        <tr className={classes.Order}>
            <td>{props.num}</td>
            <td>{props.order.order_status}</td>
            <td>{props.order.order_date}</td>
        </tr>
    )
}

export default Order;