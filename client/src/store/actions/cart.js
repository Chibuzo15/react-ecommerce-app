import * as actionTypes from './actions';

export function addToCart(id) {
    return { type: actionTypes.ADD_TO_CART, product_id : id}
}

export function removeFromCart(id) {
    return { type: actionTypes.REMOVE_FROM_CART, product_id : id}
}