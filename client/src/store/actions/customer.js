import * as actionTypes from './actions';
import axios from '../../axios';

export const login = (userObj) => {
    return dispatch => {
        axios.post('/api/users/login', userObj)
        .then(res => {
            dispatch(loginSuccess(res.data))
            
        })
        .catch((error) => {
            dispatch(loginFailed()) 
        })
    }
}

export const loginSuccess = (userObj) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userObj
    }
}

export const loginFailed = () => {
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export function logout() {
    return { type: actionTypes.LOGOUT }
  }