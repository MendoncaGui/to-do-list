import axios from "axios";

export const api = axios.create({
    baseURL: 'https//api.jsonserver.io/',
    headers: {
        "X-Jsio-Token": "6cfb05ade15ba02be8693caa1b57f6f1"
    } 
});