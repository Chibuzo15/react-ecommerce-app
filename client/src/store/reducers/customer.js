import * as actionTypes from '../actions/actions';

const initialState = {
    loggedIn: false,
    userObj: null,
    error: null,
    token: null
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                customerId: action.userObj,
                token: action.token
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                customerId: null,
                token: null,
                loggedIn: false,
                error: action.error
            }
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                customerId: null,
                token: null,
                loggedIn: false
            }
        case actionTypes.LOGOUT_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default customerReducer;