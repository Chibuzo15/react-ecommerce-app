import * as actionTypes from './actions';

const initialState = {
    loggedIn: false,
    user: null,
    showSearch: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case  actionTypes.LOGIN:
            return{
                ...state,
                loggedIn: true,
                user: action.userObj
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                loggedIn: false
            }
        case actionTypes.SHOW_SEARCH:
            return{
                ...state,
                showSearch: !state.showSearch
            } 
        default:
            return state;
    }
};

export default reducer;