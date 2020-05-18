import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import classes from './Profile.module.css';
import Button from '../../../components/UI/Button/button';
import SideBarItem from '../../../components/Admin/SideBarItem/SideBarItem';
import Orders from '../../../components/Customer/Orders/OrdersCustomer';

import { Redirect } from 'react-router-dom';

class Profile extends Component {
    state = {
        side_layout: [
            { name: 'Orders' },
            { name: 'Favourites' },
            { name: 'Personal Data' },
            { name: 'Address' },
        ],
        content: null
    }

    handleItemClick = (item) => {
        console.log(item)
        this.setState({ content: item })
    }

    renderClicked = () => {
        switch (this.state.content) {
            case ('Orders'):
                return <Orders />
            default:
                return <div>Customer dashboard</div>
        }

    }

    render() {
        if (!this.props.loggedIn) {
            return <Redirect to="/login" />;
        }

        const renderSideBar = this.state.side_layout.map(item => {
            return <SideBarItem
                clickedItem={(item) => this.handleItemClick(item)}
                key={item.name}>{item.name}</SideBarItem>
        })

        let contentToRender = this.renderClicked()

        return (
            <div>
                <div > My Account </div>
                <div className={classes.PageWrap}>
                    <div className={classes.SideBar}>Welcome User <br /> {renderSideBar} </div>
                    <div className={classes.content}> {contentToRender} </div>
                    <div>
                        <Button
                            handleClick={() => this.props.onLogout(this.props.token)}
                        >Sign out</Button></div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loggedIn: state.customer.loggedIn,
        token: state.customer.token
        // userObj : state.customer.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: (token) => dispatch(actions.logout(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);