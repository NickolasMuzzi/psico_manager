import axios from 'axios'
import Cookies from 'js-cookie'
export const apiClient = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Authorization: `Bearer ${Cookies.get('user_token')}`
    }

})