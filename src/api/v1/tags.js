import axios from "axios"
import { BASE_SERVER_URL } from "../../config"


export const getTags = async () => {
    const { token } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    return await axios.get(`${BASE_SERVER_URL}/api/tags`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
}