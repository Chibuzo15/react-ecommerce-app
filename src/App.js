import React from 'react';
import Home from './containers/Home/Home';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layouts/Layout';
import WhatsNew from './containers/NEW/WhatsNew';

function App() {
  return (
    <Layout>
      <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/whats-new" exact component={WhatsNew}/>
        </Switch>
    </Layout>
  );
}

export default App;
