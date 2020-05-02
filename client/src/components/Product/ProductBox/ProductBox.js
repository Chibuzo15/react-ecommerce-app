import React from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router'

import classes from './ProductBox.module.css';
import product1 from '../../../assets/images/Products/suit-1.jpg'
import product2 from '../../../assets/images/Products/suit-2.jpg'
import product3 from '../../../assets/images/Products/suit-3.jpg'



const ProductBox = (props) => {
    const history = useHistory()
    return (
        <div 
        onClick={() => history.push({
            pathname: `${props.match.path}/productsingle`,
            state: { id : props.id, name : props.name, price: props.price, desc: props.desc }
        })}
        className={classes.ProductBox}>
            <img 
            className={classes.ProductImage}
            src={product3}
            />
            <div className={classes.ProductTitle}>
                {props.name}
            </div>
            <div className={classes.Price}>
                {props.price}
            </div>
        </div>
    )
}

export default withRouter(ProductBox);