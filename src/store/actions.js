export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SHOW_SEARCH = 'SHOW_SEARCH';

export function logout() {
    return { type: LOGOUT }
  }

export function showSearch() {
    return { type: SHOW_SEARCH}
}