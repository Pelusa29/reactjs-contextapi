import React from 'react'
import { BookOpenIcon } from '@heroicons/react/24/solid'
import { useAuth } from "../../context/AuthContext"
import { Link } from 'react-router-dom'

export const Header = () => {

    const { isAuthenticated } = useAuth()

    const links = [
        { path: '/', label: 'Home', auth: false },
        { path: '/login', label: 'Login', auth: false },
        { path: '/mybooks', label: 'My Book', auth: true },
        { path: '/register', label: 'Register', auth: false },
        { path: '/logout', label: 'Logout', auth: true }
    ];

    return (
        <div className='shadow-md w-full'>
            <div className='md:px-10 py-4 px-7 md:flex justify-between items-center'>
                {/* Logo here */}
                <div className='flex text-2xl cursor-pointer items-center gap-2'>
                    <BookOpenIcon className='w-7 h-7 text-blue-600' />
                    <span className='font-bold'>BOOK FINDER</span>
                </div>
                {/* Links bar */}
                <ul className='md:flex pl-9 md:pl-9'>
                    {isAuthenticated ?
                        (<>
                            <li className='font-semibold my-7 md:my-0 md:ml-8'><Link to="/">Home</Link></li>
                            <li className='font-semibold my-7 md:my-0 md:ml-8'><Link to="/mybooks">My Books</Link></li>
                        </>) :
                        (<>
                            <li className='font-semibold my-7 md:my-0 md:ml-8'><Link to="/login">Login</Link></li>
                            <li className='font-semibold my-7 md:my-0 md:ml-8'><Link to="/register">Register</Link></li>
                        </>)
                    }
                </ul>
            </div>
        </div>
    )
}