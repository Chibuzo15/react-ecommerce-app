import React from 'react';
import classes from './ProductBox.module.css';
import product1 from '../../../assets/images/Products/suit-1.jpg'
import product2 from '../../../assets/images/Products/suit-2.jpg'
import product3 from '../../../assets/images/Products/suit-3.jpg'

const productBox = () => {
    return (
        <div className={classes.ProductBox}>
            <img 
            className={classes.ProductImage}
            src={product3}
            />
            <div className={classes.ProductTitle}>
                Sleek Men's suit
            </div>
            <div className={classes.Price}>
                $120
            </div>
        </div>
    )
}

export default productBox;