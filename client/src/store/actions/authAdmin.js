import * as actionTypes from './actions';

export function adminLogin() {
    return { type: actionTypes.ADMIN_LOGIN }
  }

export function adminLogout() {
    return { type: actionTypes.ADMIN_LOGOUT }
  }