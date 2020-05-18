import * as actionTypes from './actions';
import axios from '../../axios';

export const order = (orderData, token) => {
    return dispatch => {
        console.log("orderdata, token", orderData, token)
        const headers = {
            'Content-Type': 'application/json',
            'x-auth': token
        }

        axios.post('/api/add-order/', orderData, { headers: headers })
            .then(res => {
                dispatch(orderSuccess())
            })
            .catch((error) => {
                dispatch(orderFailed(error))
            })
    }
}

export const orderSuccess = (order) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        order: order
    }
}

export const orderFailed = (error) => {
    return {
        type: actionTypes.ORDER_FAILED,
        error: error
    }
}

export const getOrdersAdmin = (token) => {
    return dispatch => {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth': token
        }
        axios.get('/api/orders/', { headers: headers })
            .then(res => {
                dispatch(getOrdersAdminSuccess(res.data))
            })
            .catch((error) => {
                dispatch(getOrdersAdminFailed(error))
            })
    }
}

export const getOrdersAdminSuccess = (orders) => {
    return {
        type: actionTypes.GET_ORDERS_ADMIN_SUCCESS,
        orders: orders
    }
}

export const getOrdersAdminFailed = (error) => {
    return {
        type: actionTypes.GET_ORDERS_ADMIN_FAILED,
        error: error
    }
}

export const getOrdersCustomer = (token) => {
    return dispatch => {
        const headers = {
            'Content-Type': 'application/json',
            'x-auth': token
        }
        axios.get('/api/customer/orders', { headers: headers })
            .then(res => {
                dispatch(getOrdersCustomerSuccess(res.data))
            })
            .catch((error) => {
                dispatch(getOrdersCustomerFailed(error))
            })
    }
}

export const getOrdersCustomerSuccess = (orders) => {
    return {
        type: actionTypes.GET_ORDERS_CUSTOMER_SUCCESS,
        orders: orders
    }
}

export const getOrdersCustomerFailed = (error) => {
    return {
        type: actionTypes.GET_ORDERS_CUSTOMER_FAILED,
        error: error
    }
}