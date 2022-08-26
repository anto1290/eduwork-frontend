import { TAGS_LIST_FAIL, TAGS_LIST_REQUEST, TAGS_LIST_SUCCESS } from "../constants/tags"


export const tagsListReducer = (state = { tags: [] }, action) => {
    switch (action.type) {
        case TAGS_LIST_REQUEST:
            return { loading: true, tags: [] }
        case TAGS_LIST_SUCCESS:
            return {
                loading: false,
                tags: action.payload
            }
        case TAGS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}