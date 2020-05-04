import React from 'react';
import classes from './singleProduct.module.css';
import Button from '../../UI/Button/button';
import product3 from '../../../assets/images/Products/suit-3.jpg';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {addToCart, removeFromCart} from '../../../store/actions/index';

const singleProduct = (props) => {
    console.log(props.cartItems)
    return(
        <div className={classes.Wrapper}>
            <div className={classes.ProductDetails}>
                <span className={classes.ProductTitle}> 
                    {props.location.state.name}
                </span>
                <span className={classes.productExcerpts}>
                    {props.location.state.desc}
                </span>
                <span className={classes.Price}>
                        {props.location.state.price}
                </span>
                <Button
                    handleClick = {() => props.onAddToCart(props.location.state.name)}
                    btnType='Cart'
                >
                    BUY NOW
                </Button>
            </div>
            
            <img 
            className={classes.image}
            src={product3} 
            alt='single product image' />
            
        </div>
    )
}

const mapStateToProps = state => {
    return{
        cartItems : state.cartItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart : (name) => dispatch(addToCart(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(singleProduct));