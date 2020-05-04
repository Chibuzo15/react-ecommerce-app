import * as actionTypes from './actions';
import axios from '../../axios';

export function logout() {
    return { type: actionTypes.LOGOUT }
  }

export function showSearch() {
    return { type: actionTypes.SHOW_SEARCH}
}

export function addToCart(id) {
    return { type: actionTypes.ADD_TO_CART, product_id : id}
}

export function removeFromCart(id) {
    return { type: actionTypes.REMOVE_FROM_CART, product_id : id}
}

export const getProductsSuccess = (products) => {
    return {
        type: actionTypes.GET_PRODUCTS_SUCCESS,
        products: products
    }
}

export const getProductsFailed = () => {
    return {
        type: actionTypes.GET_PRODUCTS_FAILED
    }
}

export function getProducts() {
    return dispatch => {
        axios.get('/api/products')
        .then(res => {
            const products = res.data.map(product => {
                return {
                    id : product._id,
                    name : product.name,
                    price: product.price,
                    desc: product.description
                }
            })
            dispatch(getProductsSuccess(products))
            
        })
        .catch((error) => {
            dispatch(getProductsFailed()) })
    }
}