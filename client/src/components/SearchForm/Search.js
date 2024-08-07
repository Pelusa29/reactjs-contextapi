import React, { useRef, useEffect } from 'react'
import "./Search.css"
import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid'
import { useAuth } from '../../context/AuthContext'
// Search.js
import { useNavigate } from 'react-router-dom'


export const Search = () => {

    const searchText = useRef('');
    const navigate = useNavigate();

    const { setSearchTerm, setResultTitle } = useAuth()

    useEffect(() => searchText.current.focus(), []);
    const handleSubmit = (e) => {
        e.preventDefault();
        let tempSearchTerm = searchText.current.value.trim();
        if ((tempSearchTerm.replace(/[^\w\s]/gi, "")).length === 0) {
            setSearchTerm("the lost world");
            setResultTitle("Please Enter Something ...");
        } else {
            setSearchTerm(searchText.current.value)
        }

        navigate("/book")
    }

    return (
        <div className='search-form'>
            <div className='container'>
                <div className='search-form-content'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <div className='search-form-elem flex flex-sb bg-white'>
                            <input type="text" className='form-control' placeholder='The Lost World ...' ref={searchText} />
                            <button type="submit" className='flex flex-c' onClick={handleSubmit}>
                                <MagnifyingGlassPlusIcon className='text-purple' size={22} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}