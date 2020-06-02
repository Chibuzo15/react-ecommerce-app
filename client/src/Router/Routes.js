import React from 'react';
import Aux from '../hoc/Auxi';

import SingleProduct from '../components/Product/singleProductPage/singleProduct';
import LoginPage from '../containers/Account/LoginPage/LoginPage';
import SignUpPage from '../containers/Account/SignUpPage/SignUpPage';
import Profile from '../containers/Account/Profile/Profile';
import Cart from '../containers/Cart/Cart';
import Checkout from '../containers/Checkout/Checkout';


import Admin from '../containers/Admin/Admin';
import AdminProducts from '../components/Admin/Products/ProductsAdmin';
import AddNewProduct from '../components/Admin/Products/AddNew/AddNew';
import ProductList from '../components/Admin/Products/Products/Products';
import OrdersAdmin from '../components/Admin/Orders/OrdersAdmin';
import Dashboard from '../components/Admin/Dashboard/Dashboard';
import CustomersAdmin from '../components/Admin/Customers/CustomersAdmin';
import Users from '../components/Admin/Users/Users';

import {Route, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux'

const Routes = (props) => {
    console.log('Admin logged in', props.adminLoggedIn)
    return (
        <Aux>
            <Route 
            path={`/whats-new/:productsingle`}
            // path="/productsingle" 
            component={SingleProduct}/>
            <Route path='/login' exact component={LoginPage} />
            <Route path='/signup' exact component={SignUpPage} />
            <Route path='/my-account' exact component={Profile} />
            <Route path='/cart' exact component={Cart} />
            <Route path='/checkout' exact component={Checkout} />


            <Route path='/site-admin' exact component={Admin} />
            {/* <Route path="/site-admin">
                    {props.adminLoggedIn ? null : <Redirect to="/site-admin/login" />}
            </Route> */} 
            <Switch>
                <Route path='/site-admin/products' exact component={AdminProducts}/>
                <Route path='/site-admin/products/all' exact component={ProductList}/>
                <Route path='/site-admin/products/new' exact component={AddNewProduct}/>
            </Switch>
            <Route path='/site-admin/orders' component={OrdersAdmin} />
            <Route path='/site-admin/dashboard' component={Dashboard}/>
            <Route path='/site-admin/customers' component={CustomersAdmin} />
            <Route path='/site-admin/users' component={Users} />
            
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        adminLoggedIn : state.auth.adminLoggedIn
    }
}

export default connect(mapStateToProps)(Routes);