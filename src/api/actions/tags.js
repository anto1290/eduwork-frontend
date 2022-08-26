import axios from "axios"
import { BASE_SERVER_URL } from "../../config"
import { TAGS_LIST_FAIL, TAGS_LIST_REQUEST, TAGS_LIST_SUCCESS } from "../constants/tags"


export const listTags = () => async (dispatch) => {
    try {
        dispatch({ type: TAGS_LIST_REQUEST })

        const { data } = await axios.get(
            `${BASE_SERVER_URL}/api/tags`
        )

        dispatch({
            type: TAGS_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: TAGS_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}