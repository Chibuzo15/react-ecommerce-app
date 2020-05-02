import React from 'react';
import {withRouter} from 'react-router'

import Home from './containers/Home/Home';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layouts/Layout';
import WhatsNew from './containers/NEW/WhatsNew';
import SingleProduct from './components/Product/singleProductPage/singleProduct';
import LoginPage from './containers/Account/LoginPage/LoginPage';
import SignUpPage from './containers/Account/SignUpPage/SignUpPage';
import Profile from './containers/Account/Profile/Profile';
import Cart from './containers/Cart/Cart';

function App(props) {
  return (
    <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/whats-new" exact component={WhatsNew}/>
        </Switch>
        <Route 
        path={`/whats-new/:productsingle`}
        // path="/productsingle" 
        component={SingleProduct}/>
        <Route path='/login' exact component={LoginPage} />
        <Route path='/signup' exact component={SignUpPage} />
        <Route path='/my-account' exact component={Profile} />
        <Route path='/cart' exact component={Cart} />
    </Layout>
  );
}

export default withRouter(App);
