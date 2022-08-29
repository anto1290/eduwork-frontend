import axios from "axios";
import { BASE_SERVER_URL } from "../../config";

export const registerUser = async (data) => {

    return await axios.post(`${BASE_SERVER_URL}/auth/register`, { fullName: data.full_name, email: data.email, password: data.password });
}