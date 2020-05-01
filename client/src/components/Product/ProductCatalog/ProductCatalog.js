import React from 'react';
import ProductBox from '../ProductBox/ProductBox';
import classes from './ProductCatalog.module.css';
import SingleProduct from '../singleProductPage/singleProduct';

const productCatalog = (props) => {
    return(
        <div className={classes.PageWrapper}>
            <ProductBox/>
            <ProductBox/>
            <ProductBox/>
            <ProductBox/>
            <ProductBox/>
            <ProductBox/>
        </div>
    )
}

export default productCatalog;