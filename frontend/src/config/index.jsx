const { default: axios } = require("axios");

export const BASE_URL = " https://careerconnect-q0rr.onrender.com"

const clientServer = axios.create({
    baseURL: BASE_URL,
})

export default clientServer;