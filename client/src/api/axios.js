import axios from "axios"

const instanaceManagmentAxios = axios.create({
    baseURL: `${process.env.API_BASE_LOCAL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instanaceManagmentAxios