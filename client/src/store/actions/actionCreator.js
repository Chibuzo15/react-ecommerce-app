import * as actionTypes from './actions';
import axios from '../../axios';

export function logout() {
    return { type: actionTypes.LOGOUT }
  }

export function adminLogin() {
    return { type: actionTypes.ADMIN_LOGIN }
  }

export function adminLogout() {
    return { type: actionTypes.ADMIN_LOGOUT }
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

export const deleteProductSuccess = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
    }
} 

export const deleteProductFailed = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAILED
    }
}

export const deleteProduct = (id) => {
    return dispatch => {
        axios.delete(`/api/products/${id}`)
            .then(res => {
                dispatch(deleteProductSuccess())
            })
            .catch((error) => {
                dispatch(getProductsFailed()) })
    }
}

export const addProductSuccess = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        product: product
    }
} 

export const addProductsFailed = () => {
    return {
        type: actionTypes.ADD_PRODUCT_FAILED
    }
}

export const addProduct = (product) => {
    return dispatch => {
        axios.post('/api/products/', product)
            .then(res => {
                console.log('This is the response', res)
                let product = {
                    id : res.data._id,
                    name : res.data.name,
                    price: res.data.price,
                    desc: res.data.description
                }
                dispatch(addProductSuccess(product))
            })
            .catch((error) => {
                dispatch(addProductsFailed()) })
    }
}