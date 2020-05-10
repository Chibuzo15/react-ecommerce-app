import * as actionTypes from '../actions/actions';

const initialState = {
    loggedIn: false,
    user: null,
    error: null
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.userObj
            }
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                loggedIn: false,
                error: action.error
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                loggedIn: false
            }
        default:
            return state;
    }
}

export default customerReducer;