import * as actionTypes from './actions';
import axios from '../../axios';

export const login = (userObj) => {
    return dispatch => {
        axios.post('/api/customers/login', userObj)
        .then(res => {
            dispatch(loginSuccess(res.data))
            
        })
        .catch((error) => {
            console.log(error)
            dispatch(loginFailed(error)) 
        })
    }
}

export const loginSuccess = (userObj) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userObj
    }
}

export const loginFailed = (error) => {
    return {
        type: actionTypes.LOGIN_FAILED,
        error: error
    }
}

export function logout() {
    return { type: actionTypes.LOGOUT }
  }