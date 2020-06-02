import React from 'react';
import ProductBox from '../ProductBox/ProductBox';
import classes from './ProductCatalog.module.css';
import SingleProduct from '../singleProductPage/singleProduct';

const productCatalog = (props) => {
    let productRender = null;

    if(props.products){
        productRender = props.products.map( product => {
            return <ProductBox 
            id = {product.id}
            key = {product.id}
            name = {product.name}
            price = {product.price}
            desc = {product.desc}
            image = {product.image}
            />
        })
    }
    

    return(
        <div className={classes.PageWrapper}>
            {productRender}
        </div>
    )
}

export default productCatalog;