import * as actionTypes from '../actions/actions';

const initialState = {
    showSearch: false,
}

const UIreducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_SEARCH:
            return {
                ...state,
                showSearch: !state.showSearch
            }
        default:
            return state;
    }
}

export default UIreducer;