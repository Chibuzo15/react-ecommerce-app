import React from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router'

import classes from './ProductBox.module.css';
import product1 from '../../../assets/images/Products/suit-1.jpg'
import product2 from '../../../assets/images/Products/suit-2.jpg'
import product3 from '../../../assets/images/Products/suit-3.jpg'



const ProductBox = (props) => {
    const history = useHistory()

    //formatting base url for node server , which is used to serve product images
    const public_url = window.location.origin.toString();

    let baseUrl = "https://protected-springs-06155.herokuapp.com/";
    if (public_url.includes("localhost")){
        baseUrl = "http://localhost:5000/";
    }

    let image_url = null
    if(props.image){
        image_url = baseUrl + 'images' + props.image.replace('--', '_md')
    }

    return (
        <div 
        onClick={() => history.push({
            pathname: `${props.match.path}/productsingle`,
            state: { id : props.id, name : props.name, price: props.price, desc: props.desc }
        })}
        className={classes.ProductBox}>
            <img 
            className={classes.ProductImage}
            src={image_url}
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