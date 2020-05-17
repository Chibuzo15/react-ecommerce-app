import axios from 'axios';

const baseUrl = process.env.baseURL || "http://localhost:5000/"

const instance = axios.create({
    baseURL : baseUrl
})

export default instance;