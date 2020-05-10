import React from 'react';
import { connect } from 'react-redux';

const OrderSummary = (props) => {
    let buildCart = null;
    if(props.cartItems){
        buildCart = props.cartItems.map(item => {
            return <div
            key = {item}
            >{item}</div>
        })
    }

    return(
        <div>
            {buildCart}
        </div>
    )
}

const mapStateToProps = state => {
    return{
        cartItems : state.cart.cartItems
    }
}

export default connect(mapStateToProps)(OrderSummary);