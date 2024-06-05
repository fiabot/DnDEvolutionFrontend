import _axios from "axios";
const API_URL = 'http://localhost:5000' 

const STATIC_EVOLVE_ENDPOINT ='http://localhost:5000/evolve'
const MI_EVOLVE_ENDPOINT = 'http://localhost:5000/mi-evolve'


const handleRes = (res) => {
    return res;
};

const handleErr = (err) => {
    console.log(err);
    return err;
};

const api = _axios.create({ withCredentials: false });
api.interceptors.request.use(handleRes, handleErr);
api.interceptors.response.use(handleRes, handleErr);

export { API_URL, STATIC_EVOLVE_ENDPOINT, MI_EVOLVE_ENDPOINT, api };

