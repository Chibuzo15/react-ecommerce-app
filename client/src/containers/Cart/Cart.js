import React, { Component } from 'react';

import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import Button from '../../components/UI/Button/button';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { removeFromCart, setCart } from '../../store/actions/index';
import cartItem from './CartItem/CartItem';

class Cart extends Component {
    componentDidMount() {
        this.props.setCart()
    }
    render() {
        const topBar = [
            {
                name: 'Name',
                width: '80'
            },
            {
                name: 'Price',
                width: '10'
            },
            {
                name: 'Quantity',
                width: '10'
            }]
        const topBarRender = topBar.map(each => {
            let width = `${each.width}` + "%";
            return <div style={{ width: width }}>{each.name}</div>
        })

        let buildCart = <div className={classes.EmptyText}>Cart is currently empty</div>;

        let cartItems = null;
        if (this.props.cartData && this.props.cartData.totalQty > 0) {
            cartItems = this.props.cartData.cartItems.map(item => {
                return <CartItem
                    key={item.date}
                    remove={() => this.props.removeFromCart(item._id)}
                >{item}</CartItem>
            })

            buildCart = <div>
                <div style={{ display: "flex" }}>{topBarRender}</div>
                {cartItems}
                <div className={classes.TotalPrice}>{this.props.cartData ? this.props.cartData.totalPrice : null}</div>
                {
                    this.props.cartData.totalQty > 0 ? <Button
                        btnType='Cart'
                        handleClick={() => this.props.history.push('/checkout')}
                    >
                        PROCEED TO CHECKOUT
            </Button> : null}
            </div>
        }

        return (buildCart)
    }
}

const mapStateToProps = (state) => {
    return {
        cartData: state.cart.cartData
    }
}

const mapDispatchToProps = {
    removeFromCart,
    setCart
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));