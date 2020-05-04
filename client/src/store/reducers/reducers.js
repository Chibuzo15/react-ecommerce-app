import * as actionTypes from '../actions/actions';

const initialState = {
    loggedIn: false,
    user: null,
    showSearch: false,
    cartItems: [],
    products: null,
    products_error : false,
}

function removeCartItem(array, action) {
    return array.filter((item) => item !== action)
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
        case actionTypes.ADD_TO_CART:
            return{
                ...state,
                cartItems: [...state.cartItems, action.product_id]
            }
        case actionTypes.REMOVE_FROM_CART:
            return{
                ...state,
                cartItems: removeCartItem(state.cartItems, action.product_id)
            } 
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return{
                ...state,
                products : action.products
            } 
        case actionTypes.GET_PRODUCTS_FAILED:
            return{
                ...state,
                products_error: true,
            } 
        default:
            return state;
    }
};

export default reducer;