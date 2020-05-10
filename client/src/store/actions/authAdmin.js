import * as actionTypes from './actions';
import axios from '../../axios';

export function adminLogin(userObj) {
  return dispatch => {
    axios.post('/api/users/login', userObj)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + 3600000)
        localStorage.setItem('admin_token', res.data.token);
        localStorage.setItem('admin_expirationDate', expirationDate);
        localStorage.setItem('admin_userId', res.data.user._id)
        dispatch(adminLoginSuccess(res.data.token, res.data.user._id))

      })
      .catch((error) => {
        dispatch(adminLoginFailed(error))
      })
  }
}

export const adminLoginSuccess = (token, userId) => {
  return {
    type: actionTypes.ADMIN_LOGIN_SUCCESS,
    token,
    userId
  }
}

export const adminLoginFailed = () => {
  return {
    type: actionTypes.ADMIN_LOGIN_FAILED
  }
}

export function adminLogout() {
  localStorage.removeItem('admin_token');
  localStorage.removeItem('admin_expirationDate');
  localStorage.removeItem('admin_userId');
  return { type: actionTypes.ADMIN_LOGOUT }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(adminLogout());
    }, expirationTime * 1000)
  }
}

export const setAdminAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_ADMIN_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const adminAuthCheckState = () => {
  console.log('auth check state called')
  return dispatch => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      dispatch(adminLogout())
    } else {
      const expirationDate = new Date(localStorage.getItem('admin_expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(adminLogout())
      } else {
        const userId = localStorage.getItem('admin_userId')
        dispatch(adminLoginSuccess(token, userId))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }

    }
  };
}