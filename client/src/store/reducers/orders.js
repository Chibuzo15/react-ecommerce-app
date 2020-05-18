import * as actionTypes from '../actions/actions';

const initialState = {
    orders: null,
    adminOrders: null,
    error: false,
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUCCESS:
            return {
                ...state,
                // orders: state.orders.concat(action.order),
                error: false
            }
        case actionTypes.ORDER_FAILED:
            return {
                ...state,
                error: true
            }
        case actionTypes.GET_ORDERS_CUSTOMER_SUCCESS:
            return {
                ...state,
                error: null,
                orders: action.orders
            }
        case actionTypes.GET_ORDERS_CUSTOMER_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.GET_ORDERS_ADMIN_SUCCESS:
            return {
                ...state,
                error: null,
                adminOrders: action.orders
            }
        case actionTypes.GET_ORDERS_ADMIN_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default orderReducer