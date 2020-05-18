import React, { Component } from 'react';
import classes from './ProductsAdmin.module.css';
import AllProducts from './Products/Products';
import AddNewProduct from './AddNew/AddNew';


class ProductsAdmin extends Component {

    state = {
        content: null
    }

    changeItem = (item) => {
        this.setState({
            content: item
        })
    }

    renderItem = () => {
        switch (this.state.content) {
            case ('view'):
                return <AllProducts />
            case ('new'): 
                return <AddNewProduct />
            default:
                return null
        }
    }

    render() {
    let itemToRender = null;

    itemToRender = this.renderItem()
        return (
            <div className={classes.ProductsAdmin}>
                
                    <div>
                        <div
                            className={classes.Option}
                            onClick={() => this.changeItem('view')}
                        >View Products</div>
                        <div
                            className={classes.Option}
                            onClick={() => this.changeItem('new')}
                        >Add new product</div>
                    </div>
                    {itemToRender}
            </div>
        )
    }
}

export default ProductsAdmin;