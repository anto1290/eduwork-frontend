import axios from "axios"
import { BASE_SERVER_URL } from "../../config";

export const createProduct = async data => {
    const { token } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    const fromData = new FormData();
    fromData.append('name', data.name)
    fromData.append('description', data.description)
    fromData.append('category', data.category)
    fromData.append('price', data.price)
    fromData.append('tags', data.tags)
    fromData.append('image', data.image[0])
    return await axios.post(`${BASE_SERVER_URL}/api/products`, fromData, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
}


export const deleteProduct = async data => {
    const { token } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    return await axios.delete(`${BASE_SERVER_URL}/api/products/${data}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
}

export const getProduct = async data => {
    const { token } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    return await axios.get(`${BASE_SERVER_URL}/api/products/${data}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
}
export const updateProduct = async data => {
    const { token } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    const fromData = new FormData();
    fromData.append('name', data.name)
    fromData.append('description', data.description)
    fromData.append('category', data.category)
    fromData.append('price', data.price)
    fromData.append('tags', data.tags)
    fromData.append('image', data.image[0])
    return await axios.put(`${BASE_SERVER_URL}/api/products/${data.id}`, fromData, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        }
    })
}