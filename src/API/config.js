import _axios from "axios";
const API_URL = 'http://localhost:5000' 

const STATIC_EVOLVE_ENDPOINT ='http://localhost:5000/evolve'
const MI_EVOLVE_ENDPOINT = 'http://localhost:5000/mi-evolve'
const ADD_MONSTER_ENDPOINT = "http://localhost:5000/add-monster"

//const API_URL = 'https://combat-w6kwakpc3q-uc.a.run.app' 

//const STATIC_EVOLVE_ENDPOINT ='https://combat-w6kwakpc3q-uc.a.run.app/evolve'
//const MI_EVOLVE_ENDPOINT = 'https://combat-w6kwakpc3q-uc.a.run.app/mi-evolve'


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

export { API_URL, STATIC_EVOLVE_ENDPOINT, MI_EVOLVE_ENDPOINT, ADD_MONSTER_ENDPOINT, api };

