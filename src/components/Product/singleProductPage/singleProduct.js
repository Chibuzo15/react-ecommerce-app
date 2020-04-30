import React from 'react';
import classes from './singleProduct.module.css';
import Button from '../../UI/Button/button';
import product3 from '../../../assets/images/Products/suit-3.jpg';
import { withRouter } from 'react-router';

const singleProduct = (props) => {
    return(
        <div className={classes.Wrapper}>
            <div className={classes.ProductDetails}>
                <span className={classes.ProductTitle}> 
                    Sleek Dress
                </span>
                <span className={classes.productExcerpts}>
                Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Etiam pulvinar aliquet ligula vel consequat. Mauris pharetra sapien fermentum, pretium justo et, maximus lorem. Sed bibendum dui metus, 
                nec porta neque molestie pulvinar
                </span>
                <span className={classes.Price}>
                ₦5000
                </span>
                <Button
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

export default withRouter(singleProduct);