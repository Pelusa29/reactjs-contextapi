import axios from "axios"

const apiuRL = process.env.REACT_APP_API_URL

const instanaceManagmentAxios = axios.create({
    baseURL: "http://localhost:4000/api/",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default instanaceManagmentAxios