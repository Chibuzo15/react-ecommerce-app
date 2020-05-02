export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SHOW_SEARCH = 'SHOW_SEARCH';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export function logout() {
    return { type: LOGOUT }
  }

export function showSearch() {
    return { type: SHOW_SEARCH}
}

export function addToCart(id) {
    return { type: ADD_TO_CART, product_id : id}
}

export function removeFromCart(id) {
    return { type: REMOVE_FROM_CART, product_id : id}
}