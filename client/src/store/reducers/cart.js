import * as actionTypes from '../actions/actions';

const initialState = {
    cartItems: [],
}

function removeCartItem(array, action) {
    return array.filter((item) => item !== action)
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.product_id]
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: removeCartItem(state.cartItems, action.product_id)
            }
        default:
            return state;
    }
}

export default cartReducer;