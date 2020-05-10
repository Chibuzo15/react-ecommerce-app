import * as actionTypes from '../actions/actions';

const initialState = {
    adminLoggedIn: false,
    token: null,
    adminId: null,
    error: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                adminLoggedIn: true,
                adminId: action.userId,
                token: action.token
            }
        case actionTypes.ADMIN_LOGIN_FAILED:
                return {
                    ...state,
                    adminLoggedIn: false,
                    // user: action.userObj
                }
        case actionTypes.ADMIN_LOGOUT:
            return {
                ...state,
                adminLoggedIn: false
            }
        default:
            return state;
    }
}

export default authReducer;