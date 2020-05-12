import * as actionTypes from '../actions/actions';

const initialState = {
    orders: null,
    error: false,
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.concat(action.order),
                error: false
            }
        case actionTypes.ORDER_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default orderReducer