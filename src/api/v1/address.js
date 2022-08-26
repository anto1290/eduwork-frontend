import axios from "axios";
import { BASE_SERVER_URL } from '../../config'

export const getAddress = async () => {
    const { token } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};

    return await axios.get(`${BASE_SERVER_URL}/api/delivery-addresses?limit=`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const getLocation = async (lokasi, kodeInduk) => {
    return await axios.get(`https://regions-indoneisa.herokuapp.com/api/${lokasi}?kode_induk=${kodeInduk}`);
}

export const createAddress = async data => {
    const { token } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};

    return await axios.post(`${BASE_SERVER_URL}/api/delivery-addresses`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
} 