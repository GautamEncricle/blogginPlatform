import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + '/api/v2',
    withCredentials: true,
});


instance.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export default instance;