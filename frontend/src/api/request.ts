import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const api = axios.create({
    baseURL: process.env.REACT_APP_HOST_BACKEND as string,
});

const request = async <T>(method: AxiosRequestConfig['method'], url: string, params?: any, data?: any ): Promise<AxiosResponse<T>> => {
    try {
        return await api.request<T>({
            method,
            url,
            params,
            headers: {
                'Content-Type': 'application/json',
            },
            data,
            
        });
    } catch (error) {
        throw error;
    }
}

export default request;