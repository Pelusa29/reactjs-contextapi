import axios from './axios'

//#region Api POST
//Register user
//export const registerUserRequestAPI = user => axios.post(`/register`, user)
export const registerUserRequestAPI = async (user) => {
    try {
        const response = await axios.post(`/register`, user)
        return response
    } catch (error) {
        return error
    }
}

export const loginUserRequestAPI = async (user) => {
    try {
        const response = await axios.post(`/login`, user)
        return response
    } catch (error) {
        return error
    }
}

export const logoutUserRequestAPI = async (user) => {
    try {
        const response = await axios.post(`/logout`, user)
        return response
    } catch (error) {
        return error
    }
}

export const verifyTokenRequestAPI = async (user) => {
    try {
        const response = await axios.get(`/verify-token`)
        return response
    } catch (error) {
        throw new Error('Failed to verify token')
    }
}

