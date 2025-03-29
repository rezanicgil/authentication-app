import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const api = axios.create({
    baseURL: process.env.REACT_APP_HOST_BACKEND as string,
    withCredentials: true,
});

const request = async <T>(method: AxiosRequestConfig['method'], url: string, csrfToken: string,  params?: any, data?: any): Promise<AxiosResponse<T>> => {
    
    try {
        return await api.request<T>({
            method,
            url,
            params,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,
            },
            data,
            
        });
    } catch (error) {
        return error as AxiosResponse<T>;
    }
}

export default request;