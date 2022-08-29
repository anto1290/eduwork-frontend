import axios from "axios"
import { BASE_SERVER_URL } from "../../config"
import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/product'
export const listProducts = (keyword = '', skip = '', limit = '', category = '', tagsIn = []) => async (
    dispatch
) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(
            `${BASE_SERVER_URL}/api/products?skip=${skip}&q=${keyword}&limit=${limit}&category=${category}&${tagsIn.map(tag => `tags=${tag}`).join('&')}`
        )

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}