import * as actionTypes from './actions';

const initialState = {
    loggedIn: false
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case  actionTypes.LOGIN:
            return{
                ...state,
                loggedIn: true
            } 
        default:
            return state;
    }
};

export default reducer;