
//连接到后端
import axios from "axios";

const request = axios.create({ 
    baseURL: 'http://127.0.0.1:3000',
    headers: {
        //登陆验证密钥：让浏览器存储密钥
        authorization: localStorage.token || ''
    } 
})

export default request;