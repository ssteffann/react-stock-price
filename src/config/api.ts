import axios from 'axios';
import {API_URL, API_KEY} from '../constants/api-constants'

const instance = axios.create({
    baseURL: API_URL,
});

instance.interceptors.request.use(function (config) {
    return { ...config, params: { ...config.params,  apikey: API_KEY } };
});

export default instance;
