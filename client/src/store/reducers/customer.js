import * as actionTypes from '../actions/actions';

const initialState = {
    loggedIn: false,
    user: null,
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                user: action.userObj
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