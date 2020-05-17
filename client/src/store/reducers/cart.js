import * as actionTypes from '../actions/actions';

const initialState = {
    cartData: null,
    totalPrice: null,
    error: null,
    cartItems: []
}

function removeCartItem(array, action) {
    return array.filter((item) => item !== action)
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CART_SUCCESS:
            return {
                ...state,
                error: null,
                totalPrice: action.cartData.totalPrice,
                cartData: action.cartData
            }
        case actionTypes.SET_CART_FAILED:
            return {
                ...state,
                totalPrice: null,
                error: action.error
            }
        case actionTypes.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                error: null,
                // cartItems: [...state.cartItems, action.product_id]
            }
        case actionTypes.ADD_TO_CART_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                cartData: action.cartData
                // cartItems: removeCartItem(state.cartItems, action.product_id)
            }
        case actionTypes.REMOVE_FROM_CART_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.CLEAR_CART_SUCCESS:
            return {
                ...state,
                cartData: null
            }
        case actionTypes.CLEAR_CART_FAILED:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export default cartReducer;