import axios from 'axios';
import tools from './tools';


const instatce = axios.create({
    baseURL: 'https://api.mixin.one/',
    timeout: 10000,
})

instatce.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + tools.getJwtToken(window._keyStore, config.method, config.url, config.data || '')
    console.log(config);
    console.log(config.headers.Authorization);
    return config
})

export default instatce;