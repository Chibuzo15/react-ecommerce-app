import React, { Component } from 'react';
import classes from './ProductsAdmin.module.css';

import AdminSideWrapper from '../AdminSideWrapper/AdminSideWrapper';

import { Route, Link } from 'react-router-dom';


class ProductsAdmin extends Component {

    state = {
        content: null
    }

    changeItem = (item) => {
        this.setState({
            content: item
        })
    }

    render() {
        return (
            <AdminSideWrapper>
                <div className={classes.ProductsAdmin}>

                    <div>
                        <Link
                            to='/site-admin/products/all'
                        >
                            <div
                                className={classes.Option}
                            >View Products</div>
                        </Link>

                        <Link
                            to='/site-admin/products/new'
                        >
                            <div
                                className={classes.Option}
                            >Add new product</div>
                        </Link>

                    </div>
                </div>
            </AdminSideWrapper>
        )
    }
}

export default ProductsAdmin;