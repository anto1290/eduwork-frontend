
import axios from "axios";
import { BASE_SERVER_URL } from "../../config";
import {
    ADD_ITEMS,
    REMOVE_ITEMS,
    CLEAR_ITEMS,
    CART_REQUEST,
    CART_FAIL,
    CART_SUCCESS,
}
    from "../constants/cart";

export const saveCart = async (token, item) => {
    return await axios.put(`${BASE_SERVER_URL}/api/carts`, { items: item }, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })


}

export const getCart = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REQUEST
        })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        const { data } = await axios.get(`${BASE_SERVER_URL}/api/carts`, config);
        dispatch({
            type: CART_SUCCESS,
            payload: data
        })
        localStorage.setItem('cartPrevious', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: CART_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const addItem = (item) => ({
    type: ADD_ITEMS,
    payload: {
        item: {
            ...item,
            product: item.product || item
        }
    }
})

export function removeItem(item) {
    return {
        type: REMOVE_ITEMS,
        payload: {
            item: item
        }
    }
}

export function clearItem() {
    return {
        type: CLEAR_ITEMS
    }
}