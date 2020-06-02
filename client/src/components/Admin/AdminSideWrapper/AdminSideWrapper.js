import React, { Component } from 'react';
import classes from './AdminSideWrapper.module.css';

import SideBarItem from '../SideBarItem/SideBarItem';


class AdminSideWrapper extends Component {
    state = {
        side_layout: [
            {
                name: 'dashboard',
                link: '/site-admin/dashboard'
            },
            {
                name: 'products',
                link: '/site-admin/products'
            },
            {
                name: 'orders',
                link: '/site-admin/orders'
            },
            {
                name: 'customers',
                link: '/site-admin/customers'
            },
            {
                name: 'users',
                link: '/site-admin/users'
            },
        ],
        content: 'dashboard'
    }

    render() {
        const renderSideBar = this.state.side_layout.map(item => {
            return <SideBarItem
                link={item.link}
                key={item.name}>{item.name}</SideBarItem>
        })

        return (
            <div className={classes.Wrapper}>
                <div className={classes.SideBar}>
                    {renderSideBar}
                </div>
                <div className={classes.Content}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default AdminSideWrapper