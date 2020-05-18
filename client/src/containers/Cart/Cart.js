import React, { Component } from 'react';

import classes from './Cart.module.css';
import CartItem from './CartItem/CartItem';
import Button from '../../components/UI/Button/button';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'
import { removeFromCart, setCart } from '../../store/actions/index';
import cartItem from './CartItem/CartItem';

class Cart extends Component {
    componentDidMount() {
        this.props.setCart()
    }

    handleCheckoutClick = () => {
        if (!this.props.loggedIn) {
            this.props.history.push({
                pathname: '/login',
                state: {
                    message: 'You must be logged In before checkout',
                    redirect: '/checkout'
                }
            })
            return
        }
        this.props.history.push('/checkout')
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
            return <div key={each.name} style={{ width: width }}>{each.name}</div>
        })

        let buildCart = <div className={classes.EmptyText}>Cart is currently empty</div>;

        let cartItems = null;
        if (this.props.cartData && this.props.cartData.totalQty > 0 && this.props.cartData.cartItems) {
            cartItems = this.props.cartData.cartItems.map(item => {
                return <CartItem
                    key={item.id}
                    remove={() => this.props.removeFromCart(item.id)}
                >{item}</CartItem>
            })

            buildCart = <div>
                <div style={{ display: "flex" }}>{topBarRender}</div>
                {cartItems}
                <div className={classes.TotalPrice}>{this.props.cartData ? this.props.cartData.totalPrice : null}</div>
                {
                    this.props.cartData.totalQty > 0 ? <Button
                        btnType='Cart'
                        handleClick={this.handleCheckoutClick}
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
        cartData: state.cart.cartData,
        loggedIn: state.customer.loggedIn
    }
}

const mapDispatchToProps = {
    removeFromCart,
    setCart
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));