import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/footer';
import Search from '../../components/Search/Search';

// import { showSearch } from '../../store/actions';

import { Route } from 'react-router-dom';
import AdminLogin from '../../components/Admin/AdminLoginPage/AdminLoginPage';
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';

import * as actions from '../../store/actions/index';

class Layout extends Component{

    render(){
        return(
            <div>
                <Route path="/site-admin/login" exact component={AdminLogin}/>
                {this.props.adminLoggedIn ? 
                <AdminHeader
                logout = {() => this.props.onAdminLogout()}
                /> : null}
                <Header/>
                    <Search
                    show={this.props.showSearch}
                    />
                    <main>
                        {this.props.children}
                    </main>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        showSearch : state.UI.showSearch,
        adminLoggedIn : state.auth.adminLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdminLogout: () => dispatch(actions.adminLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);