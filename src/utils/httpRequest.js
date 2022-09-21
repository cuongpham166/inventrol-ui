import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export const post = async (path, data, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response;
};

export const put = async (path, data, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response;
};

export const softDelete = async (path, data, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response;
};

export default httpRequest;
