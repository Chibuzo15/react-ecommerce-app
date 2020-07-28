import React from 'react';
import classes from './singleProduct.module.css';
import Button from '../../UI/Button/button';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {addToCart, removeFromCart} from '../../../store/actions/index';

const singleProduct = (props) => {

    //formatting base url for node server , which is used to serve product images
    const public_url = window.location.origin.toString();

    let baseUrl = "https://protected-springs-06155.herokuapp.com/";
    if (public_url.includes("localhost")){
        baseUrl = "http://localhost:5000/";
    }

    let image_url = null
    if(props.location.state.image){
        image_url = baseUrl + 'images' + props.location.state.image.replace('--', '_lg')
    }
    console.log('Image :', image_url)

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
                    handleClick = {() => props.onAddToCart(props.location.state.id)}
                    btnType='Cart'
                >
                    BUY NOW
                </Button>
            </div>

            <img
            className={classes.image}
            src={image_url}
            alt='single product image' />

        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        onAddToCart : (name) => dispatch(addToCart(name)),
    }
}

export default connect(null, mapDispatchToProps)(withRouter(singleProduct));