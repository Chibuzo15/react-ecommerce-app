import React, { Component } from 'react';

import classes from './Admin.module.css';
import SideBarItem from '../../components/Admin/SideBarItem/SideBarItem';
import Dashboard from '../../components/Admin/Dashboard/Dashboard';
import ProductsAdmin from '../../components/Admin/Products/ProductsAdmin';
import Orders from '../../components/Admin/Orders/OrdersAdmin';
import Users from '../../components/Admin/Users/Users';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Admin extends Component {
    state = {
        side_layout: [
            { name: 'dashboard' },
            { name: 'products' },
            { name: 'orders' },
            { name: 'customers'},
            { name: 'users' },
        ],
        content: 'dashboard'
    }

    handleItemClick = (item) => {
        console.log(item)
        this.setState({ content: item })
    }

    renderClicked = () => {
        switch (this.state.content) {
            case ('dashboard'):
                return <Dashboard
                    adminLoggedIn={this.props.adminLoggedIn}
                />
            case ('products'):
                return <ProductsAdmin />
            case ('orders'):
                return <Orders />
            case ('users'):
                return <Users />
            default:
                return <Dashboard />
        }

    }

    render() {
        const renderSideBar = this.state.side_layout.map(item => {
            return <SideBarItem
                clickedItem={(item) => this.handleItemClick(item)}
                key={item.name}>{item.name}</SideBarItem>
        })

        let contentToRender = this.renderClicked()

        return (
            <div className={classes.AdminWrap}>

                <div className={classes.SideBar}>Welcome User <br /> {renderSideBar} </div>
                <div className={classes.content}> {contentToRender} </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        adminLoggedIn: state.auth.adminLoggedIn
    }
}

export default connect(mapStateToProps)(Admin);