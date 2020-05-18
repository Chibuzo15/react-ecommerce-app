import React, { Component } from 'react';
import classes from './Products.module.css';
import { connect } from 'react-redux';
import EachProduct from './EachProduct/EachProduct';
import * as actions from '../../../../store/actions/index';


class Products extends Component {
    state = {
        deleted : false
    }

    componentDidMount(){
        this.props.onGetProducts();
        this.setState({deleted: false})
    }

    handleDelete = () => {
        console.log('deleted 1')
    }

    render() {
        let products = this.props.products ? this.props.products : null;
        
        let renderProducts = null;
        if (products){
            renderProducts = products.map(product => {
            return  <EachProduct
                    key = {product.id}
                    id = {product.id}
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
        products : state.products.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProducts : () => dispatch(actions.getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);