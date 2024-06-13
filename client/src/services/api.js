import axios from 'axios';

const API_BASE_URL = 'http://16.171.137.189//api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
