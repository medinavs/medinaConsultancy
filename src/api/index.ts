import axios from 'axios';


export const request = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});