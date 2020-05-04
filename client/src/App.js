import React from 'react';
import {withRouter} from 'react-router'

import Home from './containers/Home/Home';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layouts/Layout';
import WhatsNew from './containers/WhatsNew/WhatsNew';
import Routes from './Router/Routes';

function App(props) {
  return (
    <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/whats-new" exact component={WhatsNew}/>
        </Switch>
        <Routes/>
    </Layout>
  );
}

export default withRouter(App);
