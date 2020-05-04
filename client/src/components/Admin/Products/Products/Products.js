import React, { Component } from 'react';
import classes from './Products.module.css';
import { connect } from 'react-redux';
import EachProduct from './EachProduct/EachProduct';
import * as actions from '../../../../store/actions/index';


class Products extends Component {
    componentDidMount(){
        this.props.onGetProducts();
    }

    render() {
        let products = this.props.products ? this.props.products : null;
        console.log(products);
        let renderProducts = null;
        if (products){
            renderProducts = products.map(product => {
            return  <EachProduct
                    name = {product.name}
                    price = {product.price}
                    />
        })}
        return(
            <div className={classes.ProductsWrap}>
            All products
            {renderProducts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        products : state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProducts : () => dispatch(actions.getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);