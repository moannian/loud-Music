import axios from 'axios'
import { Base_URL } from './config'
const request = (config) => {
    const instance = axios.create({
        baseURL: Base_URL,
        timeout: 5000,
        method: 'get'
    })
    instance.interceptors.response.use((response) => {
        return response.data
    })
    return instance(config)
}
export default request