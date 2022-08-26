import { ADD_ITEMS, REMOVE_ITEMS, CLEAR_ITEMS, CART_REQUEST, CART_SUCCESS, CART_FAIL } from "../constants/cart"

export const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEMS:
            if (state.find(item => item._id === action.payload.item._id)) {
                return state.map(item => ({ ...item, qty: item._id === action.payload.item._id ? item.qty + 1 : item.qty }));

            } else {
                return [...state, { ...action.payload.item, qty: 1 }]
            }
        case REMOVE_ITEMS:
            return state
                .map(item => ({ ...item, qty: item._id === action.payload.item._id ? item.qty - 1 : item.qty }))
                .filter(item => item.qty > 0);

        case CLEAR_ITEMS:
            return []

        default:
            return state
    }

}

export const getCartReducers = (state = [], action) => {
    switch (action.type) {
        case CART_REQUEST:
            return { loading: true }
        case CART_SUCCESS:
            return { loading: false, cart: action.payload }
        case CART_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}