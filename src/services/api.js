import axios from 'axios';

const { REACT_APP_HOST_API } = process.env;

const Api = axios.create({baseURL: REACT_APP_HOST_API })

export default Api;