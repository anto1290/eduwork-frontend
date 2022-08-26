import axios from "axios"
import { BASE_SERVER_URL } from "../../config"


export const getCategory = async () => {
    const { token } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    return await axios.get(`${BASE_SERVER_URL}/api/categories`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
}