import axios from "axios"
import { BASE_SERVER_URL } from "../../config";


export const createOrder = async payload => {
    const { token } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};

    return await axios.post(`${BASE_SERVER_URL}/api/orders`, payload, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export async function getInvoiceByOrderId(order_id) {
    let { token } = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')) : {};

    return await axios
        .get(`${BASE_SERVER_URL}/api/invoices/${order_id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
}

export async function getOrders() {
    let { token } = localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo')) : {};

    return await axios
        .get(`${BASE_SERVER_URL}/api/orders?limit=`, { headers: { authorization: `Bearer ${token}` } });
} 