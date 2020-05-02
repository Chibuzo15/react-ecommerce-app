import React from 'react';

import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';

import { connect } from 'react-redux';
import { removeFromCart } from '../../store/actions';

const Cart = (props) => {
    let buildCart = null;
    if(props.cartItems){
        buildCart = props.cartItems.map(item => {
            return <CartItem
            key = {item}
            remove = {() => props.removeFromCart(item)}
            >{item}</CartItem>
        })
    }
    
    return(
        <div>
            {buildCart}
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        cartItems : state.cartItems
    }
}

const mapDispatchToProps = {
    removeFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);