import axios from './axios'

//#region Api POST
//Register user
export const registerUserRequestAPI = user => axios.post(`/register`, user)
//Login user
export const loginUserRequestAPI = user => axios.post(`/login`, user)
//Logout user
export const logoutUserRequestAPI = user => axios.post(`/logout`, user)
//Verify Token
export const verifyTokenRequestAPI = () => axios.get(`/verify-token`)
