import axios from 'axios';


export const request = axios.create({
    baseURL: 'https://uj58p9e8la.execute-api.us-east-2.amazonaws.com/dev/consultancy/search',
    headers: {
        'Content-Type': 'application/json',
    },
});