import React from 'react';
import { connect } from 'react-redux';
import classes from './OrderSummary.module.css'

const OrderSummary = (props) => {
    let buildCart = null;

    if(props.cartData && props.cartData.totalQty > 0){
        buildCart = props.cartData.cartItems.map(item => {
            return <div
            key = {item.id}
            >{item.name} <span>x{item.quantity}</span></div>
        })
    }

    return(
        <div className={classes.OrderSummary}>
            <div className={classes.Heading}>
                PRODUCTS YOU ARE ORDERING
            </div>
            <div>
            {buildCart}
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return{
        cartData : state.cart.cartData
    }
}

export default connect(mapStateToProps)(OrderSummary);