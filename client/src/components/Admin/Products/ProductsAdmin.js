import React from 'react';
import classes from './ProductsAdmin.module.css';
// import AdminProducts from './Products/Products';

import { useHistory} from 'react-router-dom';

const ProductsAdmin = () => {
    let history = useHistory();
    return(
        <div className={classes.ProductsAdmin}>
            <div 
            onClick = {() => history.push('/site-admin/products')}
            >View Products</div>
            <div
            onClick = {() => history.push('/site-admin/products/new')}
            >Add new product</div>
        </div>
    )
}


export default ProductsAdmin;