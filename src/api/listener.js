import { saveCart } from "./actions/cart";
import store from "./store";


let currentAuth;
let currentCart;
const listener = () => {
    let previousAuth = currentAuth;
    let previousCart = currentCart;
    const userInfoFromStorage = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null

    currentAuth = userInfoFromStorage;
    currentCart = store.getState().cart;

    const { token } = currentAuth;
    if (currentAuth !== previousAuth) {
        localStorage.setItem('userInfo', JSON.stringify(currentAuth));
        saveCart(token, currentCart);
    }
    if (currentCart !== previousCart) {
        localStorage.setItem('cart', JSON.stringify(currentCart));
        saveCart(token, currentCart);
    }
}

export const listen = () => {
    store.subscribe(listener);
}