import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home/Home';
import Layout from './hoc/Layouts/Layout';
import WhatsNew from './containers/WhatsNew/WhatsNew';
import Routes from './Router/Routes';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignUp()
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/whats-new" exact component={WhatsNew} />
        </Switch>
        <Routes />
      </Layout>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.adminAuthCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
