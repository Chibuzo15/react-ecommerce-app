import * as actionTypes from './actions';
import axios from '../../axios';

export const login = (userObj) => {
    return dispatch => {
        axios.post('/api/customers/login', userObj)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + 3600000)

                localStorage.setItem('customer_token', res.data.token);
                localStorage.setItem('customer_expirationDate', expirationDate);
                localStorage.setItem('customer_userId', res.data.customer._id)
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
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_expirationDate');
    localStorage.removeItem('customer_userId');
    return { type: actionTypes.LOGOUT }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const setCustomerAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_ADMIN_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const customerAuthCheckState = () => {
    console.log('auth check state called')
    return dispatch => {
        const token = localStorage.getItem('customer_token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('customer_expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('customer_userId')
                dispatch(loginSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }

        }
    };
}