import axios from 'axios';

const instance = axios.create({
    baseURL : "https://protected-springs-06155.herokuapp.com/"
})

export default instance;