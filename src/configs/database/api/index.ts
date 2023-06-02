import axios from "axios";

export const api = axios.create({
    baseURL: 'https://ua-json-server.onrender.com/'
});