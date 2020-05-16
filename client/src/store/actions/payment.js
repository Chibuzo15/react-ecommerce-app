import * as actionTypes from './actions';

import {clearCart} from './cart';

export const paymentSuccess = () => {
    return dispatch => {
        dispatch(clearCart())
    }
}

export const paymentFailed = (error) => {
    return {
        type: actionTypes.PAYMENT_FAILED,
        error: error
    }
}