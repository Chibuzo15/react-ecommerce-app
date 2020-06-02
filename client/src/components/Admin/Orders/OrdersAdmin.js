import React, { Component } from 'react';
import { connect } from 'react-redux';
import EachOrder from './EachOrder/EachOrder';

import AdminSideWrapper from '../AdminSideWrapper/AdminSideWrapper';

import * as actions from '../../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onGetOrders(this.props.token)
    }

    render() {
        let orders = null;
        if (this.props.orders) {
            let i = 0;
            orders = <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>email</th>
                        <th>status</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.orders.map(order => {
                        i++
                        return <EachOrder
                            key={order._id}
                            num={i}
                            order={order}
                        />
                    })}
                </tbody>
            </table>
        }

        return (
            <AdminSideWrapper>
                <div>
                    <div>Orders</div>
                    {orders}
                </div>
            </AdminSideWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        orders: state.order.adminOrders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: (token) => dispatch(actions.getOrdersAdmin(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);