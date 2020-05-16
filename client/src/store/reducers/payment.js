import * as actionTypes from '../actions/actions';

const initialState = {
    error: null,
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PAYMENT_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.PAYMENT_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default paymentReducer;