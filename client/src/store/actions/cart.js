import * as actionTypes from './actions';
import axios from '../../axios';
import cartItem from '../../containers/Cart/CartItem/CartItem';

export const setCart = () => {
    return dispatch => {
        axios.get('/api/get-cart', {
            withCredentials: true,
        })
            .then((res) => {
                let cartItems = res.data.items.map(item => { 
                    return {
                        id: item.item._id,
                        name: item.item.name,
                        price: item.price,
                        quantity: item.qty
                    }
                })
                let cart = {
                    totalQty: res.data.totalQty,
                    totalPrice: res.data.totalPrice,
                    cartItems: cartItems
                }

                dispatch(setCartSuccess(cart))
            })
            .catch((error) => {
                console.log(error)
                dispatch(setCartFailed(error))
            })
    }
}

export const setCartSuccess = (cart) => {
    return {
        type: actionTypes.SET_CART_SUCCESS,
        cartData: cart
    }
}

export const setCartFailed = (error) => {
    return {
        type: actionTypes.SET_CART_FAILED,
        error: error
    }
}

export function addToCart(id) {
    return dispatch => {
        console.log(id)
        axios.get(`/api/add-to-cart/${id}`, { withCredentials: true })
            .then((res) => {
                dispatch(addToCartSuccess(id))
            }).catch((error) => {
                console.log(error)
                dispatch(addToCartFailed(error))
            })
    }
}

export const addToCartSuccess = (id) => {
    return {
        type: actionTypes.ADD_TO_CART_SUCCESS, product_id: id
    }
}

export const addToCartFailed = (error) => {
    return {
        type: actionTypes.ADD_TO_CART_FAILURE,
        error: error
    }
}

export function removeFromCart(id) {
    return { type: actionTypes.REMOVE_FROM_CART, product_id: id }
}

export const clearCart = () => {
    return dispatch => {
        axios.get('/api/clear-cart', { withCredentials: true })
            .then(() => {
                dispatch(clearCartSuccess())
            }) .catch((error) => {
                dispatch(clearCartFailed(error))
            })
    }
}

export const clearCartSuccess = () => {
    return { 
        type: actionTypes.CLEAR_CART_SUCCESS,
    }
}

export const clearCartFailed = (error) => {
    return {
        type: actionTypes.CLEAR_CART_FAILED,
        error: error
    }
}