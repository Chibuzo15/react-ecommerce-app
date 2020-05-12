import * as actionTypes from './actions';
import axios from '../../axios';

export const order = (orderData, token) => {
    return dispatch => {
        console.log(orderData)
        const headers = {
            'Content-Type': 'application/json',
            'x-auth': token
          }

        axios.post('/api/orders/', orderData, {headers: headers})
            .then(res => {
                // console.log('This is the response', res)
                
                dispatch(orderSuccess())
            })
            .catch((error) => {
                dispatch(orderFailed(error)) })
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