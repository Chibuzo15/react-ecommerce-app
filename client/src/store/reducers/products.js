import * as actionTypes from '../actions/actions';

const initialState = {
    products: null,
    products_error : false,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products
            }
        case actionTypes.GET_PRODUCTS_FAILED:
            return {
                ...state,
                products_error: true,
            }
        case actionTypes.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.concat(action.product)
            }
        case actionTypes.ADD_PRODUCT_FAILED:
            return {
                ...state,
                products_error: true,
            }
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.DELETE_PRODUCT_FAILED:
            return {
                ...state,
                admin_error: true,
            }
        default:
            return state;
    }
}

export default productReducer