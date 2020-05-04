import React from 'react';
import classes from './AddNew.module.css';
import * as actions from '../../../../store/actions/index';
import Button from '../../../UI/Button/button';

import { connect } from 'react-redux';

const addNew = (props) => {
    const productData = {
        name: "posted from App",
        price: 400,
        description: "Very nice looking"
    }
    return (
        <div>
            <div className={classes.Title}>Add new Product</div>
            <Button
            btnType = 'Cart'
            handleClick = {() => props.onAddProduct(productData)}
            > Add Now</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddProduct : (product) => dispatch(actions.addProduct(product))
    }
}

export default connect(null, mapDispatchToProps)(addNew);