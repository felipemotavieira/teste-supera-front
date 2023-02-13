import axios from 'axios';

// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const api = axios.create({
    baseURL: 'https://teste-supera-back.onrender.com/api/',
    timeout: 1000000
})

export default api