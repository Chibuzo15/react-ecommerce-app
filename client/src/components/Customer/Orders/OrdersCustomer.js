import React, { Component } from 'react';
import { connect } from 'react-redux';
import EachOrder from './EachOrder/EachOrder';

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
            <div>
                <div>Orders</div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.customer.token,
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrders: (token) => dispatch(actions.getOrdersCustomer(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);