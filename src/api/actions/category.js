import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS } from "../constants/category";
import { getCategory } from "../v1/category";


export const getCategoryAction = () => async (dispatch) => {
    try {
        dispatch({
            type: CATEGORY_LIST_REQUEST
        });

        const { data } = await getCategory();

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}