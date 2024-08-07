import "./Home.css"
import { Search } from "../SearchForm/Search.js"
export const Home = () => {
    return (
        <div className="header-content flex flex-c text-center text-white">
            <h2 className='header-title text-capitalize'>FIND YOU BOOK </h2><br />
            <p className='header-text fs-18 fw-3'>Our Online Book Search Platform is a robust and user-friendly web application designed to make finding and exploring books a seamless experience for book lovers, students, and researchers alike. Leveraging a comprehensive database and intuitive search functionalities, this platform allows users to easily search for books by title, author, genre, or ISBN </p>
            <Search />
        </div>
    )
}