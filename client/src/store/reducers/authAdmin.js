import * as actionTypes from '../actions/actions';

const initialState = {
    adminLoggedIn: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN:
            return {
                ...state,
                adminLoggedIn: true,
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