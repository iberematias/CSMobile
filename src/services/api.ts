import axios from 'axios';

const api = axios.create({
    baseURL: 'http://meusite.com.br/cs'
});

export default api;