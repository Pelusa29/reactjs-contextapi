import "./Search.css"
import { MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid'

export const Search = () => {
    return (
        <div className='search-form'>
            <div className='container'>
                <div className='search-form-content'>
                    <form className='search-form'>
                        <div className='search-form-elem flex flex-sb bg-white'>
                            <input type="text" className='form-control' placeholder='The Lost World ...' />
                            <button type="submit" className='flex flex-c'>
                                <MagnifyingGlassPlusIcon className='text-purple' size={22} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}