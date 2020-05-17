import axios from 'axios';

const public_url = window.location.origin.toString();

let baseUrl = "https://protected-springs-06155.herokuapp.com/";


if (public_url.includes("localhost")){
    baseUrl = "http://localhost:5000/";
}

const instance = axios.create({
    baseURL: baseUrl
})

export default instance;