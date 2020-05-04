import React from 'react';
import Aux from '../hoc/Auxi';

import SingleProduct from '../components/Product/singleProductPage/singleProduct';
import LoginPage from '../containers/Account/LoginPage/LoginPage';
import SignUpPage from '../containers/Account/SignUpPage/SignUpPage';
import Profile from '../containers/Account/Profile/Profile';
import Cart from '../containers/Cart/Cart';
import Checkout from '../containers/Checkout/Checkout';
import Admin from '../containers/Admin/Admin';
import AdminProducts from '../components/Admin/Products/Products/Products';
import AddNewProduct from '../components/Admin/Products/AddNew/AddNew';

import {Route, Switch} from 'react-router-dom';

const Routes = () => {
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

            <Switch>
                <Route path='/site-admin/products/new'  component={AddNewProduct}/>
                <Route path='/site-admin/products' component={AdminProducts}/>
            </Switch>
            
        </Aux>
    )
}

export default Routes