import { createContext, useState, useContext, useEffect } from "react";

//Import API request from auth.js
import { registerUserRequestAPI, verifyTokenRequestAPI, loginUserRequestAPI, logoutUserRequestAPI } from '../api/auth'
import Cookies from 'js-cookie'
import { useCallback } from 'react';
const URL = "http://openlibrary.org/search.json?title="


export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null) /*Estado user inicializado en null */
    const [loading, setLoading] = useState(true) /* Estado loading inicializado en true */
    const [errors, setErrors] = useState([]) /*Estado error inicializado en null */
    const [isAuthenticated, setIsAuthenticated] = useState(false) /*Estado isAuthenticated inicializado en false */

    //Apply just for book
    const [searchTerm, setSearchTerm] = useState("the lost world");
    const [books, setBooks] = useState([]);
    const [resultTitle, setResultTitle] = useState("");

    const regUser = async (user) => {
        try {
            const response = await registerUserRequestAPI(user)
            if (response.status === 200) {
                console.log(response)
                setUser(response.data) /*Asignamos el usuario correcto al estado */
                setIsAuthenticated(true) /*Cambiamos el estado de isAuthenticated a true*/
                Cookies.set('token', response.data.token, {
                    expires: 60 * 1000,
                    path: '/',
                    secure: true
                }) /*Asignamos la cookie con el token */
            } else {
                setErrors(response.response.data)
                return
            }
        } catch (error) {
            console.log(error)
            setErrors(error.response) /*Asignamos el mensaje de error al estado */
        }
    }

    const logUser = async (user) => {
        try {
            console.log(user)
            const response = await loginUserRequestAPI(user)
            if (response.status === 200) {
                /* console.log(response) */
                setUser(response.data) /*Asignamos el usuario correcto al estado */
                setIsAuthenticated(true) /*Cambiamos el estado de isAuthenticated a true*/
                Cookies.set('token', response.data.token, {
                    expires: 60 * 1000,
                    path: '/',
                    secure: true
                }) /*Asignamos la cookie con el token */
            } else {
                console.log(`Respuesta Login`)
                /* console.log(response) */
                setErrors(response.response.data)
                return
            }
        } catch (error) {
            console.log(error)
            setErrors(error.response) /*Asignamos el mensaje de error al estado */
        }
    }

    /* init Book  functionality */
    const fetchBooks = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${URL}${searchTerm}`);
            const data = await response.json();
            const { docs } = data;

            if (docs) {
                const newBooks = docs.slice(0, 20).map((bookSingle) => {
                    const { key, author_name, cover_i, edition_count, first_publish_year, title } = bookSingle;

                    return {
                        id: key,
                        author: author_name,
                        cover_id: cover_i,
                        edition_count: edition_count,
                        first_publish_year: first_publish_year,
                        title: title
                    }
                });

                setBooks(newBooks);

                if (newBooks.length > 1) {
                    setResultTitle("Your Search Result");
                } else {
                    setResultTitle("No Search Result Found!")
                }
            } else {
                setBooks([])
                setResultTitle("No Search Result Found!");
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }, [searchTerm]);


    /* End Book */

    //Delete errors after 5 seconds
    useEffect(() => {
        console.log(errors)
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        fetchBooks();
    }, [searchTerm, fetchBooks])

    //UssEffect to check if user is authenticated
    useEffect(() => {
        async function checkLogin() {
            console.log('Initialized Check Value for User information')
            let token = null
            token = Cookies.get('token')
            console.log(`Validando: ${token}`)
            console.log(JSON.stringify(Cookies))
            if (token === undefined) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
                Cookies.remove('token')
                Cookies.remove('userId')
                Cookies.remove('name')
                return
            } else {
                try {
                    const response = await verifyTokenRequestAPI()
                    /* console.log(response) */
                    if (response.status === 200) {
                        setUser(response.data)
                        setIsAuthenticated(true)
                        setLoading(false)
                    } else {
                        console.log('Error de Consulta Token')
                        Cookies.remove('token')
                        Cookies.remove('userId')
                        Cookies.remove('name')
                        setIsAuthenticated(false)
                        setUser(null)
                        setLoading(false)
                    }
                } catch (error) {
                    /* console.log(error.message) */
                    Cookies.remove('token')
                    Cookies.remove('userId')
                    Cookies.remove('name')
                    setIsAuthenticated(false)
                    setUser(null)
                    setLoading(false)
                }
            }
        }
        checkLogin()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                regUser,
                logUser,
                loading,
                user,
                isAuthenticated,
                errors,
                books, setSearchTerm, resultTitle, setResultTitle
            }}>
            {children}
        </AuthContext.Provider>
    )
}