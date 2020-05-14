import React from 'react';
import { connect } from 'react-redux';

const OrderSummary = (props) => {
    let buildCart = null;

    if(props.cartData && props.cartData.totalQty > 0){
        buildCart = props.cartData.cartItems.map(item => {
            return <div
            key = {item.id}
            >{item.name}</div>
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
        cartData : state.cart.cartData
    }
}

export default connect(mapStateToProps)(OrderSummary);