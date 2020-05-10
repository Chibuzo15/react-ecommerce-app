import React from 'react';

import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import Button from '../../components/UI/Button/button';

import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { removeFromCart } from '../../store/actions/index';

const Cart = (props) => {
    const history = useHistory();

    let buildCart = <div className={classes.EmptyText}>Cart is currently empty</div>;

    if(props.cartItems.length > 0){
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
            {
            props.cartItems.length > 0 ? <Button
            btnType='Cart'
            handleClick = {() => history.push('/checkout')}
            >
            PROCEED TO CHECKOUT
            </Button> : null }
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        cartItems : state.cart.cartItems
    }
}

const mapDispatchToProps = {
    removeFromCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);